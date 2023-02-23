import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser({ email, password }: RegisterDto): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    return this.userRepository.save(user);
  }

  async findUserByemail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
