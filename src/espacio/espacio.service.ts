import { Injectable } from '@nestjs/common';
import { CreateEspacioDto } from './dtos/create-espacio.dto';

@Injectable()
export class EspacioService {
  async findAll(): Promise<any> {
    return 'soy espacio service';
  }

  create(createEspacioDto: CreateEspacioDto) {
    return 'post del espacio';
  }
}
