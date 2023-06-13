import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudController } from './solicitud.controller';
import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from './dtos/create-solicitud.dto';
import { Solicitud } from './schemas/solicitud.schema';
import { ObjectId, SchemaTypes } from 'mongoose';

const solicitudes: Array<{ _id: ObjectId } & Solicitud> = [
  {
    _id: new SchemaTypes.ObjectId('1'),
    nombre: 'Sara',
    cargo: 'formador',
    promocion: 'p7',
    email: 'sara@mail.com',
    tipo: 'masterclass',
    nombreActividad: 'Taller Testing APIs NestJS',
    start: new Date('01/01/31'),
    end: new Date('01/01/31'),
    dia: 'Lunes',
    horaInicio: '13:00',
    horaFin: '14:00',
  },
];

describe('SolicitudController', () => {
  let controller: SolicitudController;
  const mockSolicitudService = {
    findAll: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ solicitudes })),
    create: jest
      .fn()
      .mockImplementation((createSolicitudDto: CreateSolicitudDto) => {
        const newSolicitud = {
          _id: new SchemaTypes.ObjectId('2'),
          ...createSolicitudDto,
        };
        solicitudes.push(newSolicitud);
        return Promise.resolve(newSolicitud);
      }),
  };
  //ARRANGE -
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudController],
      providers: [SolicitudService],
    })
      .overrideProvider(SolicitudService)
      .useValue(mockSolicitudService)
      .compile();
    // INTANCIA DEL CONTROLLER
    controller = module.get<SolicitudController>(SolicitudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return a spaces list', async () => {
    expect(await controller.findAll()).toMatchObject({ solicitudes });
  });
  it('should create an space and return the new space "{id: 2,edificio: "B",aula: "A"}" ', async () => {
    const newSolicitud = {
      nombre: 'John',
      cargo: 'trainer',
      promocion: 'p7',
      email: 'john@mail.com',
      tipo: 'masterclass',
      nombreActividad: 'Taller Testing APIs NestJS',
      start: new Date('01/01/31'),
      end: new Date('01/01/31'),
      dia: 'Lunes',
      horaInicio: '13:00',
      horaFin: '14:00',
    };
    expect(await controller.create(newSolicitud)).toMatchObject({
      _id: expect.any(SchemaTypes.ObjectId),
    });
  });
});
