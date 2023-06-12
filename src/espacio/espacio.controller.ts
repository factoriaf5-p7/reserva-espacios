import { Body, Controller, Get, Post } from '@nestjs/common';
import { EspacioService } from './espacio.service';
import { CreateEspacioDto } from './dtos/create-espacio.dto';

@Controller('espacio')
export class EspacioController {
  constructor(private espacioService: EspacioService) {}
  //GET obtener todos los espacios
  @Get()
  findAll() {
    return this.espacioService.findAll();
  }

  @Post()
  create(@Body() createEspacioDto: CreateEspacioDto) {
    return this.espacioService.create(createEspacioDto);
  }
}
