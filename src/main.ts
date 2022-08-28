import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as express from 'express';
import helmet from 'helmet';
import { SwaggerConfig } from './config/swagger.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: '*',
  });
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  SwaggerConfig(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
