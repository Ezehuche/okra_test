import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { UtilsService } from 'src/utils/utils.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { AccountsService } from 'src/account/accounts.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { Account, AccountSchema } from 'src/account/entities/account.entity';
import {
  Transaction,
  TransactionSchema,
} from 'src/transactions/entities/transaction.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    UtilsService,
    AccountsService,
    TransactionsService,
  ],
})
export class CustomersModule {}
