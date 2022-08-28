import {
  Controller,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { PrincipalGuard } from '../users/guards/principal.guard';

@Controller('customer')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(PrincipalGuard)
  @Get('')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOperation({
    summary: 'Get the customer data',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
  })
  @UsePipes(new ValidationPipe())
  findOne() {
    return this.customersService.find();
  }
}
