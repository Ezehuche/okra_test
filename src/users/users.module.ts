import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../config/env.config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UtilsService } from '../utils/utils.service';
import { AccountsService } from '../account/accounts.service';
import { TransactionsService } from '../transactions/transactions.service';
import { Account, AccountSchema } from '../account/entities/account.entity';
import {
  Transaction,
  TransactionSchema,
} from '../transactions/entities/transaction.entity';

@Module({
  imports: [
    // eslint-disable-next-line prettier/prettier
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '365d', //30min
      },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    JwtStrategy,
    UtilsService,
    AccountsService,
    TransactionsService,
  ],
})
export class UsersModule {}
