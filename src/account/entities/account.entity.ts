import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Customer } from '../../customers/entities/customer.entity';

export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true })
  code: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  customer: Customer;

  @Prop({ required: true })
  type: string;

  @Prop({ type: mongoose.Schema.Types.Decimal128 })
  accountBalance: string;

  @Prop({ required: true })
  accountCurrency: string;

  @Prop({ type: mongoose.Schema.Types.Decimal128, required: true })
  ledgerBalance: string;

  @Prop()
  ledgerCurrency: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
