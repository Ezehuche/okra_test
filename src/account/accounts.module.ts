import { Account, AccountSchema } from './entities/account.entity';
import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
// import { IdentitiesController } from './identities.controller';
import { UtilsService } from 'src/utils/utils.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  // controllers: [IdentitiesController],
  providers: [AccountsService, UtilsService],
})
export class AccountsModule {}
