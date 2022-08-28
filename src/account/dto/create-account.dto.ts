import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  auth_id: string;

  @IsNotEmpty()
  customer_id: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  accountBalance: string;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  ledgerBalance: string;

  @IsNotEmpty()
  @IsString()
  _id: string;
}
