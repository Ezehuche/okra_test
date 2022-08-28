import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsService } from './utils.service';
import { UtilsController } from './utils.controller';

import { CustomersService } from '../customers/customers.service';
import { AccountsService } from '../account/accounts.service';
import { TransactionsService } from '../transactions/transactions.service';
import { AccountUche, AccountSchema } from '../account/entities/account.entity';
import {
  CustomerUche,
  CustomerSchema,
} from '../customers/entities/customer.entity';
import {
  TransactionUche,
  TransactionSchema,
} from '../transactions/entities/transaction.entity';

@Module({
  imports: [
    // eslint-disable-next-line prettier/prettier
    MongooseModule.forFeature([
      { name: TransactionUche.name, schema: TransactionSchema },
      { name: AccountUche.name, schema: AccountSchema },
      { name: CustomerUche.name, schema: CustomerSchema },
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
