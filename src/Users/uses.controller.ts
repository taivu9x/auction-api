import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('me')
  async getMe(@Req() req) {
    return 'Hello world';
  }

  @Post('register')
  async register(@Body() createUserDto: RegisterDto) {
    if (!createUserDto.email || !createUserDto.password) {
      throw new HttpException(
        'Email and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.userService.hashPassword(
      createUserDto.password,
    );
    const user = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    const token = this.userService.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.userService.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
