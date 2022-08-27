import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Customer } from 'src/customers/entities/customer.entity';

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

  @Prop()
  accountBalance: mongoose.Decimal128;

  @Prop({ required: true })
  accountCurrency: string;

  @Prop({ required: true })
  ledgerBalance: mongoose.Decimal128;

  @Prop()
  ledgerCurrency: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
