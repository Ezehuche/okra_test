import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { AuthUche } from '../../auth/entities/auth.entity';
import { CustomerUche } from '../../customers/entities/customer.entity';
import { AccountUche } from '../../account/entities/account.entity';

export type TransactionDocument = TransactionUche & Document;

@Schema({ timestamps: true })
export class TransactionUche {
  @Prop({ required: true })
  code: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AuthUche' })
  auth: AuthUche;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CustomerUche' })
  customer: CustomerUche;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AccountUche' })
  account: AccountUche;

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

export const TransactionSchema = SchemaFactory.createForClass(TransactionUche);
