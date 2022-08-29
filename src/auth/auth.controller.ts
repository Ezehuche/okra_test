import {
  Controller,
  Post,
  Param,
  Get,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthsService } from './auth.service';
import { AccountsService } from '../account/accounts.service';
import { CustomersService } from '../customers/customers.service';
import { TransactionsService } from '../transactions/transactions.service';
import { AuthDto } from './dto/create-auth.dto';
import { okraBank } from '../scrapers';

@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private readonly customersService: CustomersService,
    private readonly accountsService: AccountsService,
    private readonly transactionsService: TransactionsService,
  ) {}

  @Post('getStarted')
  @ApiBody({
    type: AuthDto,
  })
  @ApiOperation({
    summary: 'Enter your Okra bank credentials to get all your bank statements',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
  })
  @UsePipes(new ValidationPipe())
  // @UsePipes(new ValidationPipe())
  async createAuth(@Request() req) {
    // console.log(req);
    const scrapedData = await okraBank(
      req.body.email,
      req.body.password,
      req.body.otp,
    );
    const payload = { ...scrapedData.auth, otp: req.body.otp };
    const authObj = await this.authsService.create(payload);
    const customerPayload = {
      ...scrapedData.customer_details,
      auth_id: authObj._id,
    };
    const customerObj = await this.customersService.create(customerPayload);
    const acctArr = scrapedData.account_details.accountArr;
    acctArr.map(async (acct) => {
      const acctPayload = {
        ...acct,
        auth_id: authObj._id,
        customer_id: customerObj._id,
      };
      await this.accountsService.create(acctPayload);
    });
    const transArr = scrapedData.account_details.transactionArr;
    transArr.map(async (trans) => {
      const transPayload = {
        ...trans,
        auth_id: authObj._id,
        customer_id: customerObj._id,
      };
      await this.transactionsService.create(transPayload);
    });
    return {
      status: true,
      message: 'Data was successfully saved',
    };
    // return this.authsService.create(payload);
  }

  @Get(':customerId')
  @ApiOperation({
    summary: 'Get Customer Authentication Details',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
  })
  @UsePipes(new ValidationPipe())
  findByCustomer(@Param('customerId') customer_id: string) {
    return this.authsService.findByCustomer(customer_id);
  }
}
