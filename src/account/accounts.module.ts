import { AccountUche, AccountSchema } from './entities/account.entity';
import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { UtilsService } from '../utils/utils.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransactionUche,
  TransactionSchema,
} from '../transactions/entities/transaction.entity';
import { TransactionsService } from '../transactions/transactions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountUche.name, schema: AccountSchema },
      { name: TransactionUche.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService, UtilsService, TransactionsService],
})
export class AccountsModule {}
