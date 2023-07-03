import { Injectable } from '@nestjs/common';
import { CreateSolicitudDto } from '../reserva/dtos/create-solicitud.dto';
import { Solicitud } from './schemas/solicitud.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class SolicitudService {
  constructor(
    @InjectModel(Solicitud.name) private solicitudModel: Model<Solicitud>,
  ) {}
  async findAll(): Promise<Solicitud[]> {
    return this.solicitudModel
      .find()
      .populate({ path: 'user', select: 'email name' })
      .exec();
    // return 'soy solicitud service';
  }

  // async create(user: User, createSolicitudDto: CreateSolicitudDto) {
  //   console.log(user);
  //   const { actividad, nombreActividad, inicio, fin } = createSolicitudDto;
  //   const solicitud: Solicitud = {
  //     user,
  //     inicio,
  //     fin,
  //     actividad,
  //     nombreActividad,
  //   };

  //   return this.solicitudModel.create(solicitud);
  //   // return 'post del solicitud';
  // }

  async create(data: any) {
    console.log(data);

    const { actividad, nombreActividad, inicio, fin } = data.createSolicitudDto;
    const solicitud: Solicitud = {
      user: data.user,
      inicio,
      fin,
      actividad,
      nombreActividad,
    };

    return this.solicitudModel.create([solicitud], { session: data.session });
  }
}
