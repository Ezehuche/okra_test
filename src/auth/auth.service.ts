import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilsService } from '../utils/utils.service';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Auth, AuthDocument } from './entities/auth.entity';
import * as randomstring from 'randomstring';

@Injectable()
export class AuthsService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private utils: UtilsService,
  ) {}
  async create(createAuth: CreateAuthDto) {
    try {
      const { email, user_id: user, password } = createAuth;
      // const { cookies } = createAuth;

      // const auth = await this.authModel.findOne({ user }).exec();
      // if (auth) throw new NotFoundException('Cookie already exists');

      const createdAuth = new this.authModel({
        code: `auth_${randomstring.generate({
          length: 6,
          capitalization: 'lowercase',
          charset: 'alphanumeric',
        })}`,
        email,
        password,
        user,
      });
      await createdAuth.save();
      return createdAuth;

      // return this.utils.sendObjectResponse('auth created', {
      //   createdAuth,
      // });
    } catch (error) {
      console.log({ error });
      throw new NotFoundException(error.message, error.errors);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
