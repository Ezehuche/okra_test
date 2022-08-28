import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto, UserDto } from './users/dto/create-user.dto';
import { loginUserDto } from './users/dto/update-user.dto';
import { ApiBody, ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiExcludeEndpoint()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('register')
  @ApiExcludeEndpoint()
  @ApiBody({
    type: UserDto,
  })
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.appService.register(createUserDto);
  }

  @Post('login')
  @ApiExcludeEndpoint()
  @ApiBody({
    type: loginUserDto,
  })
  login(@Body() loginUser: loginUserDto) {
    return this.appService.login(loginUser);
  }
}
