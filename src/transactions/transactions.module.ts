import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
// import { CustomersController } from './customers.controller';
import { AccountsService } from 'src/account/accounts.service';
import { Account, AccountSchema } from 'src/account/entities/account.entity';
import { UtilsModule } from 'src/utils/utils.module';
import { UtilsService } from 'src/utils/utils.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './entities/transaction.entity';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Account.name, schema: AccountSchema },
    ]),
    UtilsModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, UtilsService, AccountsService],
})
export class TransactionsModule {}
