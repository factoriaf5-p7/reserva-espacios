import { Injectable } from '@nestjs/common';
import { CreateEspacioDto } from './dtos/create-espacio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Espacio } from './entities/espacio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EspacioService {
  constructor(
    @InjectRepository(Espacio) private espacioRepository: Repository<Espacio>,
  ) {}
  async findAll(): Promise<Espacio[]> {
    return this.espacioRepository.find();
    // return 'soy espacio service';
  }

  async create(createEspacioDto: CreateEspacioDto) {
    return this.espacioRepository.save(createEspacioDto);
    // return 'post del espacio';
  }
}
