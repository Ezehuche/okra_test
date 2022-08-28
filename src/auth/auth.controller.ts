import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrincipalGuard } from 'src/users/guards/principal.guard';
import { AuthsService } from './auth.service';
import { AccountsService } from 'src/account/accounts.service';
import { CustomersService } from 'src/customers/customers.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { AuthDto } from './dto/create-auth.dto';
import { okraBank } from 'src/scrapers';

@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private readonly customersService: CustomersService,
    private readonly accountsService: AccountsService,
    private readonly transactionsService: TransactionsService,
  ) {}

  @UseGuards(PrincipalGuard)
  @Post('getStarted')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiBody({
    type: AuthDto,
  })
  @ApiOperation({
    summary: 'Enter your Okra bank credentials to retrieve your account',
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
    const payload = { ...scrapedData.auth, user_id: req.user.userId };
    await this.authsService.create(payload);
    const customerPayload = {
      ...scrapedData.customer_details,
      user_id: req.user.userId,
    };
    const customerObj = await this.customersService.create(customerPayload);
    const acctArr = scrapedData.account_details.accountArr;
    acctArr.map(async (acct) => {
      const acctPayload = {
        ...acct,
        user_id: req.user.userId,
        customer_id: customerObj._id,
      };
      await this.accountsService.create(acctPayload);
    });
    const transArr = scrapedData.account_details.transactionArr;
    transArr.map(async (trans) => {
      const transPayload = {
        ...trans,
        user_id: req.user.userId,
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
}
