import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsService } from '../utils/utils.service';
import { CustomersService } from '../customers/customers.service';
import { AccountsService } from '../account/accounts.service';
import { TransactionsService } from '../transactions/transactions.service';
import { Auth, AuthSchema } from './entities/auth.entity';
import { Account, AccountSchema } from '../account/entities/account.entity';
import {
  Transaction,
  TransactionSchema,
} from '../transactions/entities/transaction.entity';
import {
  Customer,
  CustomerSchema,
} from '../customers/entities/customer.entity';
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
