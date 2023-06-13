import { Injectable } from '@nestjs/common';
import { CreateSolicitudDto } from './dtos/create-solicitud.dto';
// import { InjectRepository } from '@nestjs/typeorm';
import { Solicitud } from './schemas/solicitud.schema';
// import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SolicitudService {
  constructor(
    @InjectModel(Solicitud.name) private solicitudModel: Model<Solicitud>,
  ) {}
  async findAll(): Promise<Solicitud[]> {
    return this.solicitudModel.find().exec();
    // return 'soy solicitud service';
  }

  async create(createSolicitudDto: CreateSolicitudDto) {
    return this.solicitudModel.create(createSolicitudDto);
    // return 'post del solicitud';
  }
}
