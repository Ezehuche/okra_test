import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
// import { CustomersController } from './customers.controller';
import { AccountsService } from '../account/accounts.service';
import { AccountUche, AccountSchema } from '../account/entities/account.entity';
import { UtilsModule } from '../utils/utils.module';
import { UtilsService } from '../utils/utils.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransactionUche,
  TransactionSchema,
} from './entities/transaction.entity';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransactionUche.name, schema: TransactionSchema },
      { name: AccountUche.name, schema: AccountSchema },
    ]),
    UtilsModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, UtilsService, AccountsService],
})
export class TransactionsModule {}
