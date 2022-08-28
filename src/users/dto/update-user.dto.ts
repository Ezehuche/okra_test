import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class loginUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Password' })
  password: string;
}
