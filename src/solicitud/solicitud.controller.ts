import { Body, Controller, Get, Post } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';

@Controller('solicitud')
export class SolicitudController {
  constructor(private solicitudService: SolicitudService) {}
  //GET obtener todos los solicituds
  @Get()
  findAll() {
    return this.solicitudService.findAll();
  }

  @Post()
  create(@Body() createSolicitudDto: CreateSolicitudDto) {
    return this.solicitudService.create(createSolicitudDto);
  }
}
