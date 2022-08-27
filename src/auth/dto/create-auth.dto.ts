import { IsOptional } from 'class-validator';
// import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsObject } from 'class-validator';

export class CreateAuthDto {
  @IsOptional()
  @IsObject()
  cookies: object;

  @IsOptional()
  @IsString()
  _id: string;
}
