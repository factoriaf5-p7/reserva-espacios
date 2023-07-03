import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateSolicitudDto } from './dtos';
import { Reserva } from './schemas/reserva.schema';
import { SolicitudService } from '../solicitud/solicitud.service';
import { EspacioService } from '../espacio/espacio.service';
import { DateToolService } from '../utils/date-tool.service';
import { UserService } from '../user/user.service';
import { Solicitud } from 'src/solicitud/schemas/solicitud.schema';

@Injectable()
export class ReservaService {
  constructor(
    private readonly userService: UserService,
    private readonly solicitudService: SolicitudService,
    private readonly espacioService: EspacioService,
    private readonly dateToolService: DateToolService,
    @InjectModel(Reserva.name) private reservaRepository: Model<Reserva>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async create(
    email: string,
    createSolicitudDto: CreateSolicitudDto,
  ): Promise<any> {
    const session = await this.connection.startSession();
    try {
      // creamos una transaction para poder abortar el proceso en el caso de que no se puedan hacer alguna de las consultas.

      await session.withTransaction(async () => {
        // Obtenemos el objeto "user" a partir del mail (proporcionado en el token)
        const user = await this.userService.findByEmail(email);

        // Creamos la "solicitud" utilizando el user del paso anterior
        const solicitud = await this.solicitudService.create({
          user,
          createSolicitudDto,
          session,
        });
        console.log('REGISTRO--->', solicitud);

        // Buscamos el objeto "espacio" a partir del identificador que viene en la solicitud
        const espacio = await this.espacioService.findOne(
          createSolicitudDto.espacio,
        );

        // Calculamos el número de días laborables que se quiere reservar la sala
        let numberOfDays = this.dateToolService.calcBusinessDays(
          createSolicitudDto.inicio,
          createSolicitudDto.fin,
        );

        // Creamos un array de Reservas a partir de los días laborables obtenidos
        const arrayReservas = [...Array(++numberOfDays)].map((_, i) => ({
          actividad: createSolicitudDto.actividad,
          nombreActividad: '',
          fecha: this.dateToolService.getDateFromNumberOfDays(
            createSolicitudDto.inicio,
            i,
          ),
          hora: this.dateToolService.getTimeFromDate(createSolicitudDto.inicio),
          solicitud: solicitud[0],
          espacio,
        }));

        console.log('ARRAY RESERVAS ------_>', arrayReservas);

        //persistimos los datos de reservas
        const reservas = await this.reservaRepository.insertMany(
          arrayReservas,
          { session },
        );
        console.log(reservas);

      });
      return { message: 'success' };
    } catch (error: any) {
      throw error;
    } finally {
      session.endSession();
    }
  }

  async findAll(): Promise<any> {
    return await this.reservaRepository
      .find()
      .populate('espacio')
      .populate({ path: 'solicitud', populate: 'user' })
      .exec();
  }

  async findOne(id: string): Promise<Reserva> {
    const _id = new mongoose.Types.ObjectId(id);
    return await this.reservaRepository.findOne({ _id });
  }

  //   async update(
  //     id: number,
  //     updateReservaDto: UpdateReservaDto,
  //   ): Promise<Reserva> {
  //     let toUpdate = await this.reservaRepository.findOne(id);

  //     let updated = Object.assign(toUpdate, updateReservaDto);

  //     return this.reservaRepository.save(updated);
  //   }

  //   async remove(id: number): Promise<any> {
  //     return await this.reservaRepository.delete(id);
  //   }
}
