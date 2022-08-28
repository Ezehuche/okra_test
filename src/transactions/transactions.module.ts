import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
// import { CustomersController } from './customers.controller';
import { UtilsService } from 'src/utils/utils.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './entities/transaction.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  // controllers: [CustomersController],
  providers: [TransactionsService, UtilsService],
})
export class TransactionsModule {}
