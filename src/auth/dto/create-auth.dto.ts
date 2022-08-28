import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  otp: string;
}

export class AuthDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Bank email address' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Bank password' })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Test OTP' })
  otp: string;
}
