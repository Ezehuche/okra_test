import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account, AccountDocument } from './entities/account.entity';
import * as randomstring from 'randomstring';

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
