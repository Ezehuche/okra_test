import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  customer_id: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  accountBalance: string;

  @IsNotEmpty()
  accountCurrency: string;

  @IsNotEmpty()
  ledgerBalance: string;

  @IsOptional()
  ledgerCurrency: string;

  @IsNotEmpty()
  @IsString()
  _id: string;
}
