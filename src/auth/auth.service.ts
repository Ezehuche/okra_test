import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as CryptoJS from 'crypto-js';
import { JWT_SECRET } from '../config/env.config';
import { UtilsService } from '../utils/utils.service';
import { CustomersService } from '../customers/customers.service';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthUche, AuthDocument } from './entities/auth.entity';
import * as randomstring from 'randomstring';

@Injectable()
export class AuthsService {
  constructor(
    @InjectModel(AuthUche.name) private authModel: Model<AuthDocument>,
    private utils: UtilsService,
    private customersService: CustomersService,
  ) {}
  async create(createAuth: CreateAuthDto) {
    try {
      const { email, otp, password } = createAuth;
      // const { cookies } = createAuth;

      // const auth = await this.authModel.findOne({ user }).exec();
      // if (auth) throw new NotFoundException('Cookie already exists');
      const passwordHash = CryptoJS.AES.encrypt(password, JWT_SECRET);

      const createdAuth = new this.authModel({
        code: `auth_${randomstring.generate({
          length: 6,
          capitalization: 'lowercase',
          charset: 'alphanumeric',
        })}`,
        email,
        password: passwordHash,
        otp,
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

  async findByCustomer(customer_id: string) {
    try {
      console.log(customer_id);
      const customer = await this.customersService.findById(customer_id);
      const auth = await this.authModel.findById(customer.auth).exec();
      const decrypted = CryptoJS.AES.decrypt(auth.password, JWT_SECRET);
      auth.password = decrypted.toString(CryptoJS.enc.Utf8);
      return {
        status: true,
        message: `Customers authentication detail`,
        data: auth,
      };
    } catch (error) {
      console.log({ error });
      throw new NotFoundException(error.message, error.errors);
    }
  }
}
