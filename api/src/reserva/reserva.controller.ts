import {
  Controller,
  Get,
  Post,
  Req,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto, CreateSolicitudDto, UpdateReservaDto } from './dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Reserva } from './schemas/reserva.schema';
import { SolicitudService } from '../solicitud/solicitud.service';

@Controller('reserva')
@ApiTags('reserva')
@ApiBearerAuth('access-token')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req): Promise<any> {
    const createSolicitudDto = req.body as CreateSolicitudDto;
    return this.reservaService.create(req.user.email, createSolicitudDto);
  }

  @Get()
  findAll(): Promise<Reserva[]> {
    return this.reservaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Reserva> {
    return this.reservaService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateReservaDto: UpdateReservaDto,
  // ): Promise<Reserva> {
  //   return this.reservaService.update(+id, updateReservaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<any> {
  //   return this.reservaService.remove(+id);
  // }
}
