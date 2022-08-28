import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ACCESSTOKEN } from './env.config';

export function SwaggerConfig(app: INestApplication): void {
  if (process.env.ENVIRONMENT !== 'PRODUCTION') {
    const options = new DocumentBuilder()
      .setTitle('Okra Test Server API Docs')
      .setDescription('Okra Test REST API Documentation')
      .setVersion('1.0.0')
      .addBearerAuth(undefined, 'defaultBearerAuth')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    const actions = {
      swaggerOptions: {
        authAction: {
          defaultBearerAuth: {
            name: 'defaultBearerAuth',
            schema: {
              description: 'Default',
              type: 'http',
              in: 'header',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
            value: ACCESSTOKEN,
          },
        },
      },
    };
    SwaggerModule.setup('api-docs', app, document, actions);
  }
}
