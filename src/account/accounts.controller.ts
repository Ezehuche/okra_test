import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { PrincipalGuard } from '../users/guards/principal.guard';
import { PageRequest } from '../page/page.request';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(PrincipalGuard)
  @Get('customer/:customerId')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiQuery({
    name: 'pageNo',
    required: false,
    description: 'page limit default 1',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'page size default 15',
  })
  @ApiOperation({
    summary: 'Get All Customers Account API',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
  })
  @UsePipes(new ValidationPipe())
  findByCustomer(
    @Param('customerId') customer_id: string,
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
  ) {
    const pageRequest: PageRequest = new PageRequest(pageNo, pageSize);
    return this.accountsService.findByCustomer(customer_id, pageRequest);
  }

  @UseGuards(PrincipalGuard)
  @Get(':id')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOperation({
    summary: 'Get an account by Id',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
  })
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @UseGuards(PrincipalGuard)
  @Get('')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiQuery({
    name: 'pageNo',
    required: false,
    description: 'page limit default 1',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'page size default 15',
  })
  @ApiOperation({
    summary: 'Fetch all accounts',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
  })
  @UsePipes(new ValidationPipe())
  findAll(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
  ) {
    const pageRequest: PageRequest = new PageRequest(pageNo, pageSize);
    return this.accountsService.findAll(pageRequest);
  }
}
