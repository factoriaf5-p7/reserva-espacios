import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { Espacio } from '../../espacio/schemas/espacio.schema';
// import { User } from '../../user/schemas/user.schema';
import { Solicitud } from '../../solicitud/schemas/solicitud.schema';

export type ReservaDocument = HydratedDocument<Reserva>;
// export type ReservaDocument = Reserva & Document;
@Schema()
export class Reserva {
  @Prop()
  nombreActividad: string;

  @Prop()
  actividad: string;

  @ApiProperty({
    example: '08/05/2006',
    description: 'solo formato fecha',
  })
  @Prop()
  fecha: string;

  @ApiProperty({
    example: 11,
    description: 'hora del día de 0 a 23',
  })
  @Prop()
  hora: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Solicitud' })
  solicitud: Solicitud;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Espacio' })
  espacio: Espacio;
}

const ReservaSchema = SchemaFactory.createForClass(Reserva);

ReservaSchema.index({ fecha: 1, hora: 1 }, { unique: true });

export { ReservaSchema };
