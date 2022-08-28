import { Account, AccountSchema } from './entities/account.entity';
import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { UtilsService } from '../utils/utils.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Transaction,
  TransactionSchema,
} from '../transactions/entities/transaction.entity';
import { TransactionsService } from '../transactions/transactions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService, UtilsService, TransactionsService],
})
export class AccountsModule {}
