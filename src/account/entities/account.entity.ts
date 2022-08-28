import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { AuthUche } from '../../auth/entities/auth.entity';
import { CustomerUche } from '../../customers/entities/customer.entity';

export type AccountDocument = AccountUche & Document;

@Schema({ timestamps: true })
export class AccountUche {
  @Prop({ required: true })
  code: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AuthUche' })
  auth: AuthUche;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CustomerUche' })
  customer: CustomerUche;

  @Prop({ required: true })
  type: string;

  @Prop({ type: mongoose.Schema.Types.Decimal128 })
  accountBalance: string;

  @Prop({ required: true })
  currency: string;

  @Prop({ type: mongoose.Schema.Types.Decimal128, required: true })
  ledgerBalance: string;
}

export const AccountSchema = SchemaFactory.createForClass(AccountUche);
