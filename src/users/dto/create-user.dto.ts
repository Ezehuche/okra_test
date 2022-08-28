import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  _id: string;
}

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Password' })
  password: string;
}
