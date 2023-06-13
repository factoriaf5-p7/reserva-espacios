import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const options = new DocumentBuilder()
    .setTitle('Reserva Espacios')
    .setDescription('API REST para reservar espacios con MongoDB')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  //http://localhost:3000/api/v1/
  //habilitamos cors a nivel global de nuestra api.
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
