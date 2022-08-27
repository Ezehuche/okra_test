import { IsNotEmpty } from 'class-validator';

export class updateCustomerDto {
  @IsNotEmpty()
  name: string;
}
