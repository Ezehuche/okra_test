import { Module } from '@nestjs/common';
import { AuthsService } from './auth.service';
import { AuthsController } from './auth.controller';
import { UtilsService } from 'src/utils/utils.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './entities/auth.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  controllers: [AuthsController],
  providers: [AuthsService, UtilsService],
})
export class AuthsModule {}
