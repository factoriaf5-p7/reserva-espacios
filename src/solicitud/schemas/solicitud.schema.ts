import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type EspacioDocument = HydratedDocument<Solicitud>;

@Schema()
export class Solicitud {
  // @ApiProperty({ example: 99 })
  // @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  @Prop()
  id: number;

  @ApiProperty({ example: 'Aitor Tilla' })
  @Prop()
  nombre: string;

  @ApiProperty({ example: 'Formador' })
  @Prop()
  cargo: string;

  @ApiProperty({ example: 'P7' })
  @Prop()
  promocion: string;

  @ApiProperty({ example: 'aitor@tilla.com' })
  @Prop()
  email: string;

  @ApiProperty({ example: 'Masterclass' })
  @Prop()
  tipo: string;

  @ApiProperty({ example: 'Taller Testing APIs NestJS' })
  @Prop()
  nombreActividad: string;

  @ApiProperty({ example: '2022-03-14' })
  @Prop()
  start: Date;

  @ApiProperty({ example: '2022-03-28' })
  @Prop()
  end: Date;

  @ApiProperty({ example: 'Martes' })
  @Prop()
  dia: string;

  @ApiProperty({ example: '10' })
  @Prop()
  horaInicio: string;

  @ApiProperty({ example: '12' })
  @Prop()
  horaFin: string;
}

export const SolicitudSchema = SchemaFactory.createForClass(Solicitud);
