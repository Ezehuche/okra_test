import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { AuthUche } from '../../auth/entities/auth.entity';

export type CustomerDocument = CustomerUche & Document;

@Schema({ timestamps: true })
export class CustomerUche {
  @Prop({ required: true })
  code: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AuthUche' })
  auth: AuthUche;

  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop({ required: true })
  bvn: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone_number: string;
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerUche);
