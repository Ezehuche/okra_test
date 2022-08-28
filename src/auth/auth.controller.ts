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
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { auth } from 'src/scrapers/okraBank/auth';

@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private readonly customersService: CustomersService,
    private readonly accountsService: AccountsService,
    private readonly transactionsService: TransactionsService,
  ) {}

  // @UseGuards(PrincipalGuard)
  //   @ApiOperation({
  //     summary: 'Start Auth Process',
  //     description: 'Start Auth Process',
  //   })
  //   @ApiBody({
  //     description: 'Request Body',
  //     type: CreateAuthDto,
  //   })
  //   @ApiResponse({
  //     status: 200,
  //   })
  //   @ApiHeader({
  //     name: 'x-access-token',
  //     description: 'Super Admin JWT',
  //     required: true,
  //   })
  @UseGuards(PrincipalGuard)
  @Post('getStarted')
  @UsePipes(new ValidationPipe())
  // @UsePipes(new ValidationPipe())
  async createAuth(@Request() req) {
    // console.log(req);
    const scrapedData = await auth();
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authsService.remove(+id);
  }
}
