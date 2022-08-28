import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { UsersModule } from 'src/users/users.module';
import { AppModule } from 'src/app.module';
import { UserSeed } from './seeds/user.seed';

@Module({
  imports: [CommandModule, UsersModule, AppModule],
  providers: [UserSeed],
  exports: [],
})
export class MigrationModule {}
