import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SwaggerConfig(app: INestApplication): void {
  if (process.env.ENVIRONMENT !== 'PRODUCTION') {
    const options = new DocumentBuilder()
      .setTitle('Okra Test Server API Docs')
      .setDescription('Okra Test REST API Documentation')
      .setVersion('1.0.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }
}
