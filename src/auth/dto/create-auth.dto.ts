import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  user_id: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
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
