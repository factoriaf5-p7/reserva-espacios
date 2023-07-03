import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type EspacioDocument = HydratedDocument<Solicitud>;

@Schema()
export class Solicitud {
  @ApiProperty({ example: '1253u923412e3123' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @ApiProperty({ example: '2018-06-12T19:30', description: 'date-time data' })
  @Prop()
  inicio: string;

  @ApiProperty({ example: '2018-06-12T19:30', description: 'date-time data' })
  @Prop()
  fin: string;

  @ApiProperty({ example: 'masterclass' })
  actividad: string;

  @ApiProperty({ example: 'Taller Testing APIs NestJS' })
  nombreActividad: string;
}

export const SolicitudSchema = SchemaFactory.createForClass(Solicitud);
