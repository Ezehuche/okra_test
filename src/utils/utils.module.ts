import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsService } from './utils.service';
import { UtilsController } from './utils.controller';

import { CustomersService } from '../customers/customers.service';
import { AccountsService } from '../account/accounts.service';
import { TransactionsService } from '../transactions/transactions.service';
import { Account, AccountSchema } from '../account/entities/account.entity';
import {
  Customer,
  CustomerSchema,
} from '../customers/entities/customer.entity';
import {
  Transaction,
  TransactionSchema,
} from '../transactions/entities/transaction.entity';

@Module({
  imports: [
    // eslint-disable-next-line prettier/prettier
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [UtilsController],
  providers: [
    UtilsService,
    CustomersService,
    AccountsService,
    TransactionsService,
  ],
})
export class UtilsModule {}
