import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EspacioModule } from './espacio/espacio.module';
import { SolicitudModule } from './solicitud/solicitud.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ReservaModule } from './reserva/reserva.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/espacios'),
    EspacioModule,
    SolicitudModule,
    UserModule,
    AuthModule,
    ReservaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
