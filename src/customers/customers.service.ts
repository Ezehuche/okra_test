import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilsService } from 'src/utils/utils.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer, CustomerDocument } from './entities/customer.entity';
import * as randomstring from 'randomstring';

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

      // const customer = await this.customerModel
      //   .findOne({ user })
      //   .exec();
      // if (customer) throw new NotFoundException('Customer already exists');

      const createdCustomer = new this.customerModel({
        code: `cus_${randomstring.generate({
          length: 6,
          capitalization: 'lowercase',
          charset: 'alphanumeric',
        })}`,
        email,
        name,
        address,
        phone_number,
        bvn,
        user,
      });
      await createdCustomer.save();

      return createdCustomer;
    } catch (error) {
      console.log({ error });
      throw new NotFoundException(error.message, error.errors);
    }
  }

  async find() {
    try {
      const customer = await this.customerModel.find().exec();
      return {
        status: true,
        message: `Successfully fetched customer`,
        data: customer,
      };
    } catch (error) {
      console.log({ error });
      throw new NotFoundException(error.message, error.errors);
    }
  }
}
