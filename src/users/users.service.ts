import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { loginUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private utils: UtilsService,
  ) {}

  async create(createUser: CreateUserDto) {
    const { email } = createUser;

    const user = await this.userModel
      .findOne({ email: email.toLowerCase() })
      .exec();
    console.log({ user });
    if (user) throw new NotFoundException('User already exists');

    createUser.password = bcrypt.hashSync(createUser.password, 8);

    const createdUser = new this.userModel(createUser);
    return createdUser.save();
  }

  async findAll() {
    const users = await this.userModel
      .find()
      .select({
        firstName: 1,
        lastName: 1,
        email: 1,
        createdAt: 1,
        updatedAt: 1,
        _id: 0,
      })
      .exec();

    return this.utils.sendObjectResponse('User Gotten', users);
  }
}
