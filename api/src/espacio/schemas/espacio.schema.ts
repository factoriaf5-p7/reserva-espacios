import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type EspacioDocument = HydratedDocument<Espacio>;

@Schema()
export class Espacio {
  // @PrimaryGeneratedColumn()
  // id: number;

  @Prop()
  edificio: string;

  @Prop()
  aula: string;
}

export const EspacioSchema = SchemaFactory.createForClass(Espacio);
