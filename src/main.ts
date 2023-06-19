import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //http://localhost:3000/api/v1/
  app.setGlobalPrefix('api/v1');
  //habilitamos cors a nivel global de nuestra api.
  const options = new DocumentBuilder().setTitle('Reserva Espacios')
    .setDescription('descripción')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
