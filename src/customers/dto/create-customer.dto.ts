import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  address: string;

  @IsNotEmpty()
  bvn: string;

  @IsNotEmpty()
  email: string;

  @IsOptional()
  phone_number: string;

  @IsOptional()
  @IsString()
  _id: string;
}
