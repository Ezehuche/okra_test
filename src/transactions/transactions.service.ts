import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import {
  Transaction,
  TransactionDocument,
} from './entities/transaction.entity';
import * as randomstring from 'randomstring';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}
  async create(createTransaction: CreateTransactionDto) {
    try {
      const {
        type,
        user_id: user,
        customer_id: customer,
        account_id: account,
        clearedDate,
        description,
        amount,
        currency,
        beneficiary,
        sender,
      } = createTransaction;

      //   const transaction = await this.transactionModel.findOne({ user }).exec();
      //   if (transaction)
      //     throw new NotFoundException('Transactions already exist for this user');

      const createdTransaction = new this.transactionModel({
        code: `trans_${randomstring.generate({
          length: 6,
          capitalization: 'lowercase',
          charset: 'alphanumeric',
        })}`,
        type,
        account,
        clearedDate,
        description,
        amount,
        currency,
        beneficiary,
        sender,
        user,
        customer,
      });
      await createdTransaction.save();

      return createdTransaction;
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
