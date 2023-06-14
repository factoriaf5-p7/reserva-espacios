import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type EspacioDocument = HydratedDocument<Espacio>;

@Schema()
export class Espacio {
  @ApiProperty({ example: 'A' })
  @Prop()
  edificio: string;

  @ApiProperty({ example: '1' })
  @Prop()
  aula: string;
}

export const EspacioSchema = SchemaFactory.createForClass(Espacio);
