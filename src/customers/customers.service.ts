import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilsService } from 'src/utils/utils.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer, CustomerDocument } from './entities/customer.entity';
import * as randomstring from 'randomstring';
import { updateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    private utils: UtilsService,
  ) {}
  async create(createCustomer: CreateCustomerDto) {
    try {
      const {
        email,
        user_id: user,
        phone_number,
        name,
        address,
        bvn,
      } = createCustomer;

      const customer = await this.customerModel
        .findOne({ email: email.toLowerCase(), user })
        .exec();
      if (customer) throw new NotFoundException('User already exists');

      const createdCustomer = new this.customerModel({
        code: `cus_${randomstring.generate({
          length: 6,
          capitalization: 'lowercase',
          charset: 'alphanumeric',
        })}`,
        email,
        name,
        address,
        bvn,
        user,
      });
      await createdCustomer.save();

      return createdCustomer;

      //   return this.utils.sendObjectResponse('customer created', {
      //     createdCustomer,
      //   });
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
