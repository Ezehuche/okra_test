import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { UtilsService } from '../utils/utils.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerUche, CustomerSchema } from './entities/customer.entity';
import { AccountsService } from '../account/accounts.service';
import { TransactionsService } from '../transactions/transactions.service';
import { AccountUche, AccountSchema } from '../account/entities/account.entity';
import {
  TransactionUche,
  TransactionSchema,
} from '../transactions/entities/transaction.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerUche.name, schema: CustomerSchema },
      { name: AccountUche.name, schema: AccountSchema },
      { name: TransactionUche.name, schema: TransactionSchema },
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
