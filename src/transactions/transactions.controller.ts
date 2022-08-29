import {
  Controller,
  Get,
  Query,
  Param,
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
import { TransactionsService } from './transactions.service';
import { PrincipalGuard } from '../users/guards/principal.guard';
import { PageRequest } from '../page/page.request';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('acc/:accountId')
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
    summary: 'Get All transactions by account API',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
  })
  @UsePipes(new ValidationPipe())
  findByAccount(
    @Param('accountId') account_id: string,
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
  ) {
    const pageRequest: PageRequest = new PageRequest(pageNo, pageSize);
    return this.transactionsService.findByAccount(account_id, pageRequest);
  }

  @Get('cus/:customerId')
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
    summary: 'Get All transactions by customer API',
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
    return this.transactionsService.findByCustomer(customer_id, pageRequest);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a transaction by Id',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
  })
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Get('')
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
    summary: 'Fetch all transactions',
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
    return this.transactionsService.findAll(pageRequest);
  }
}
