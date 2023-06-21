import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, DeleteUserDto } from './dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = new this.userModel(createUserDto);
      const res: any = await createdUser.save();
      return res._doc;
    } catch (error) {
      if (error?.name === 'MongoError' && error.code === 11000) {
        throw ConflictException;
      }
    }
  }
  findAll() {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string) {
    const user: User = await this.userModel.findOne({ email }).lean().exec();

    if (!user) {
      throw new Error('User not found');
    }
    // return user._doc;
    return user;
  }

  removeByUser(deleteUserDto: DeleteUserDto) {
    const { email } = deleteUserDto;
    return this.userModel.deleteOne({ email });
  }
}
