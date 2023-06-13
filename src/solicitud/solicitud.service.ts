import { Injectable } from '@nestjs/common';
import { CreateSolicitudDto } from './dtos/create-solicitud.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitud } from './entities/solicitud.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SolicitudService {
  constructor(
    @InjectRepository(Solicitud)
    private solicitudRepository: Repository<Solicitud>,
  ) {}
  async findAll(): Promise<Solicitud[]> {
    return this.solicitudRepository.find();
    // return 'soy solicitud service';
  }

  async create(createSolicitudDto: CreateSolicitudDto) {
    return this.solicitudRepository.save(createSolicitudDto);
    // return 'post del solicitud';
  }
}
