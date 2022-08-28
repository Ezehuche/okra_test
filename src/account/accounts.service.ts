import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account, AccountDocument } from './entities/account.entity';
import * as randomstring from 'randomstring';
import { PageRequest } from 'src/page/page.request';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}
  async create(createAccount: CreateAccountDto) {
    try {
      const {
        type,
        user_id: user,
        customer_id: customer,
        accountBalance,
        accountCurrency,
        ledgerBalance,
        ledgerCurrency,
        _id,
      } = createAccount;

      // const account = await this.accountModel.findOne({ user }).exec();
      // if (account)
      //   throw new NotFoundException('Account already exist for this user');

      const createdAccount = new this.accountModel({
        code: `cus_${randomstring.generate({
          length: 6,
          capitalization: 'lowercase',
          charset: 'alphanumeric',
        })}`,
        type,
        accountBalance,
        accountCurrency,
        ledgerBalance,
        ledgerCurrency,
        _id,
        user,
        customer,
      });
      await createdAccount.save();

      return createdAccount;
    } catch (error) {
      console.log({ error });
      throw new NotFoundException(error.message, error.errors);
    }
  }

  async findByCustomer(customer_id: string, pageRequest: PageRequest) {
    try {
      const account = await this.accountModel
        .find({ customer: customer_id })
        .limit(pageRequest.getLimit())
        .skip(pageRequest.getOffset())
        .exec();
      return {
        status: true,
        message: `Customers account fetched successfully`,
        data: account,
      };
    } catch (error) {
      console.log({ error });
      throw new NotFoundException(error.message, error.errors);
    }
  }

  async findOne(id: string) {
    try {
      const account = await this.accountModel.findOne({ id }).exec();
      return {
        status: true,
        message: `Successfully fetched the account`,
        data: account,
      };
    } catch (error) {
      console.log({ error });
      throw new NotFoundException(error.message, error.errors);
    }
  }

  async findAll(pageRequest: PageRequest) {
    try {
      const account = await this.accountModel
        .find()
        .limit(pageRequest.getLimit())
        .skip(pageRequest.getOffset())
        .exec();
      return {
        status: true,
        message: `Successfully fetched all accounts`,
        data: account,
      };
    } catch (error) {
      console.log({ error });
      throw new NotFoundException(error.message, error.errors);
    }
  }
}
