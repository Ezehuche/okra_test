import { IsOptional, IsNotEmpty } from 'class-validator';
// import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
