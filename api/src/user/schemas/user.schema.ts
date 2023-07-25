import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { Reserva, ReservaSchema } from '../../reserva/schemas/reserva.schema';

export type UserDocument = HydratedDocument<User>;
// export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  cargo: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: now() })
  createAt: Date;

  @Prop({ default: now() })
  updateAt: Date;

  @Prop()
  hash_refresh_token: string;

  @Prop([ReservaSchema])
  reservas: Reserva[];
}

export const UserSchema = SchemaFactory.createForClass(User);
