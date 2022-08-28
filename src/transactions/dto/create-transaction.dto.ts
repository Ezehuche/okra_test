import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  auth_id: string;

  @IsNotEmpty()
  customer_id: string;

  @IsNotEmpty()
  account_id: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  clearedDate: Date;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  amount: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  beneficiary: string;

  @IsNotEmpty()
  @IsString()
  sender: string;
}
