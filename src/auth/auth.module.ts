import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsService } from 'src/utils/utils.service';
import { CustomersService } from 'src/customers/customers.service';
import { AccountsService } from 'src/account/accounts.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { Auth, AuthSchema } from './entities/auth.entity';
import { Account, AccountSchema } from 'src/account/entities/account.entity';
import {
  Transaction,
  TransactionSchema,
} from 'src/transactions/entities/transaction.entity';
import {
  Customer,
  CustomerSchema,
} from 'src/customers/entities/customer.entity';
import { AuthsService } from './auth.service';
import { AuthsController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [AuthsController],
  providers: [
    AuthsService,
    UtilsService,
    AccountsService,
    TransactionsService,
    CustomersService,
  ],
})
export class AuthsModule {}
