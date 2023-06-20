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
      return this.userRepository.save(createUserDto);
    } catch (error) {
      if (error) console.log(error);
    }

    // return this.userRepository.save(createUserDto);
  }
  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
    //mongoose this.userModel.findOne({email})
  }
}
