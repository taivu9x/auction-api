import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly jwtSecret = process.env.JWT_SECRET;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  generateToken(user: User): string {
    const payload = { email: user.email, sub: user.id };
    const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
    return token;
  }

  async createUser({ email, password }: RegisterDto) {
    const user = new User();
    user.email = email;
    user.password = password;
    return this.userRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return null;
    }

    return user;
  }
}
