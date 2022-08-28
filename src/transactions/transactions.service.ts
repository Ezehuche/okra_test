import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import {
  Transaction,
  TransactionDocument,
} from './entities/transaction.entity';
import * as randomstring from 'randomstring';
import { PageRequest } from 'src/page/page.request';

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

  async findByAccount(account_id: string, pageRequest: PageRequest) {
    try {
      const transaction = await this.transactionModel
        .find({ account: account_id })
        .limit(pageRequest.getLimit())
        .skip(pageRequest.getOffset())
        .exec();
      return {
        status: true,
        message: `Transactions fetched successfully for ${account_id}`,
        data: transaction,
      };
    } catch (error) {
      console.log({ error });
      throw new NotFoundException(error.message, error.errors);
    }
  }

  async findByCustomer(customer_id: string, pageRequest: PageRequest) {
    try {
      const transaction = await this.transactionModel
        .find({ customer: customer_id })
        .limit(pageRequest.getLimit())
        .skip(pageRequest.getOffset())
        .exec();
      return {
        status: true,
        message: `Transactions fetched successfully for ${customer_id}`,
        data: transaction,
      };
    } catch (error) {
      console.log({ error });
      throw new NotFoundException(error.message, error.errors);
    }
  }

  async findOne(id: string) {
    try {
      const transaction = await this.transactionModel.findOne({ id }).exec();
      return {
        status: true,
        message: `Successfully fetched the transaction`,
        data: transaction,
      };
    } catch (error) {
      console.log({ error });
      throw new NotFoundException(error.message, error.errors);
    }
  }

  async findAll(pageRequest: PageRequest) {
    try {
      const transaction = await this.transactionModel
        .find()
        .limit(pageRequest.getLimit())
        .skip(pageRequest.getOffset())
        .exec();
      return {
        status: true,
        message: `Successfully fetched all transactions`,
        data: transaction,
      };
    } catch (error) {
      console.log({ error });
      throw new NotFoundException(error.message, error.errors);
    }
  }

  //   async findByDate(pageRequest: PageRequest) {
  //     try {
  //       const transaction = await this.transactionModel
  //         .find()
  //         .limit(pageRequest.getLimit())
  //         .skip(pageRequest.getOffset())
  //         .exec();
  //       return {
  //         status: true,
  //         message: `Successfully fetched all transactions`,
  //         data: transaction,
  //       };
  //     } catch (error) {
  //       console.log({ error });
  //       throw new NotFoundException(error.message, error.errors);
  //     }
  //   }
}
