import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('Reserva Espacios')
    .setDescription('API REST para reservar espacios con MongoDB')
    .setVersion('1.0')
    // .addBearerAuth(
    //   { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
    //   'access-token',
    // )
    .addCookieAuth('access_token', {
      type: 'http',
      in: 'header',
      scheme: 'Bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  //http://localhost:3000/api/v1/
  //habilitamos cors a nivel global de nuestra api.
  app.enableCors();
  // app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
