import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type SolicitudDocument = HydratedDocument<Solicitud>;

@Schema()
export class Solicitud {
  @ApiProperty({ example: 1 })
  @Prop()
  id: number;

  @ApiProperty({ example: 'Sara Lindon' })
  @Prop()
  nombre: string;

  @ApiProperty({ example: 'Formador' })
  @Prop()
  cargo: string;

  @ApiProperty({ example: 'P7' })
  @Prop()
  promocion: string;

  @ApiProperty({ example: 'sara@lindon.com' })
  @Prop()
  email: string;

  @ApiProperty({ example: 'Masterclass' })
  @Prop()
  tipo: string;

  @ApiProperty({ example: 'Taller de Testing APIs con NestJS' })
  @Prop()
  nombreActividad: string;

  @ApiProperty({ example: '2023-06-14' })
  @Prop()
  start: Date;

  @ApiProperty({ example: '2023-06-14' })
  @Prop()
  end: Date;

  @ApiProperty({ example: 'Miércoles' })
  @Prop()
  dia: string;

  @ApiProperty({ example: '11:00' })
  @Prop()
  horaInicio: string;

  @ApiProperty({ example: '12:00' })
  @Prop()
  horaFin: string;
}

export const SolicitudSchema = SchemaFactory.createForClass(Solicitud);
