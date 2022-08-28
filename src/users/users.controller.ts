import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiExcludeEndpoint, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
import { PrincipalGuard } from './guards/principal.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @ApiExcludeEndpoint()
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
  })
  findAll(@Request() req) {
    console.log({ req: req.user });
    return this.usersService.findAll();
  }
}
