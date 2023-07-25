import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { Reserva, ReservaSchema } from './schemas/reserva.schema';
import { SolicitudModule } from '../solicitud/solicitud.module';
import { DateToolService } from 'src/utils/date-tool.service';
import { EspacioModule } from 'src/espacio/espacio.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reserva.name, schema: ReservaSchema }]),
    UserModule,
    SolicitudModule,
    EspacioModule,
  ],
  controllers: [ReservaController],
  providers: [ReservaService, DateToolService],
})
export class ReservaModule {}
