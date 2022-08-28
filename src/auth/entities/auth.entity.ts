import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';

export type AuthDocument = AuthUche & Document;

@Schema({ timestamps: true })
export class AuthUche {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  otp: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthUche);
