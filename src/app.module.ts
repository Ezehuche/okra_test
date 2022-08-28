import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JWT_SECRET, MONGO_URL } from './config/env.config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './users/auth.service';
import { User, UserSchema } from './users/entities/user.entity';
import { UtilsModule } from './utils/utils.module';
import { AccountsModule } from './account/accounts.module';
import { AccountsService } from './account/accounts.service';
import { CustomersModule } from './customers/customers.module';
import { CustomersService } from './customers/customers.service';
import { UtilsService } from './utils/utils.service';
import { AuthsModule } from './auth/auth.module';
import { TransactionsService } from './transactions/transactions.service';
import { AccountUche, AccountSchema } from './account/entities/account.entity';
import {
  TransactionUche,
  TransactionSchema,
} from './transactions/entities/transaction.entity';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    // PassportModule,
    UsersModule,
    MongooseModule.forRoot(MONGO_URL),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: AccountUche.name, schema: AccountSchema },
      { name: TransactionUche.name, schema: TransactionSchema },
    ]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '365d', //30min
      },
    }),
    UtilsModule,
    AuthsModule,
    CustomersModule,
    TransactionsModule,
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    UtilsService,
    AccountsService,
    TransactionsService,
    // CustomersService,
  ],
})
export class AppModule {}
