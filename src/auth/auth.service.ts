import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilsService } from 'src/utils/utils.service';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Auth, AuthDocument } from './entities/auth.entity';
import * as randomstring from 'randomstring';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthsService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private utils: UtilsService,
  ) {}
  async create(createAuth: CreateAuthDto) {
    try {
      const { email, user_id: user, password } = createAuth;

      const customer = await this.authModel
        .findOne({ email: email.toLowerCase(), user })
        .exec();
      if (customer) throw new NotFoundException('User already exists');

      const createdAuth = new this.authModel({
        code: `auth_${randomstring.generate({
          length: 6,
          capitalization: 'lowercase',
          charset: 'alphanumeric',
        })}`,
        email,
        user,
      });
      await createdAuth.save();

      return this.utils.sendObjectResponse('auth created', {
        createdAuth,
      });
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
