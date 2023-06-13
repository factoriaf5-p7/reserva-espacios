import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EspacioModule } from './espacio/espacio.module';
import { SolicitudModule } from './solicitud/solicitud.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/espacios'),
    EspacioModule,
    SolicitudModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
