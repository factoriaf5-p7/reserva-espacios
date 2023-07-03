import { Injectable } from '@nestjs/common';
import { CreateEspacioDto } from './dto/create-espacio.dto';
// import { InjectRepository } from '@nestjs/typeorm';
import { Espacio } from './schemas/espacio.schema';
// import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class EspacioService {
  constructor(
    @InjectModel(Espacio.name) private espacioModel: Model<Espacio>,
  ) {}
  async findAll(): Promise<Espacio[]> {
    return this.espacioModel.find().exec();
    // return this.espacioRepository.find();
    // return 'soy espacio service';
  }

  async create(createEspacioDto: CreateEspacioDto) {
    return this.espacioModel.create(createEspacioDto);
    // return this.espacioRepository.save(createEspacioDto);
    // return 'post del espacio';
  }

  async findOne(id: string) {
    return this.espacioModel.findOne({ _id: id });
  }
}
