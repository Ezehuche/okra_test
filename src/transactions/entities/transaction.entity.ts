import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Account } from 'src/account/entities/account.entity';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  code: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  customer: Customer;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account: Account;

  @Prop({ required: true })
  type: string;

  @Prop()
  clearedDate: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.Decimal128, required: true })
  amount: string;

  @Prop()
  currency: string;

  @Prop({ required: true })
  beneficiary: string;

  @Prop({ required: true })
  sender: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
