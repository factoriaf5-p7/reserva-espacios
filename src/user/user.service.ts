import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userCreated = await this.userRepository.save(createUserDto);
      console.log(userCreated);
      return userCreated;
    } catch (error) {
      console.log(error);
    }

    // return this.userRepository.save(createUserDto);
  }
}