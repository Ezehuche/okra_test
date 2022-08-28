import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsService } from '../utils/utils.service';
import { CustomersService } from '../customers/customers.service';
import { AccountsService } from '../account/accounts.service';
import { TransactionsService } from '../transactions/transactions.service';
import { AuthUche, AuthSchema } from './entities/auth.entity';
import { AccountUche, AccountSchema } from '../account/entities/account.entity';
import {
  TransactionUche,
  TransactionSchema,
} from '../transactions/entities/transaction.entity';
import {
  CustomerUche,
  CustomerSchema,
} from '../customers/entities/customer.entity';
import { AuthsService } from './auth.service';
import { AuthsController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthUche.name, schema: AuthSchema },
      { name: CustomerUche.name, schema: CustomerSchema },
      { name: AccountUche.name, schema: AccountSchema },
      { name: TransactionUche.name, schema: TransactionSchema },
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
