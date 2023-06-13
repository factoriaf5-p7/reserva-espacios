import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudService } from './solicitud.service';
import { Solicitud } from './schemas/solicitud.schema';
import { CreateSolicitudDto } from './dtos/create-solicitud.dto';
import { ObjectId, SchemaTypes } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

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
describe('SolicitudService', () => {
  let service: SolicitudService;
  const mockSolicitudModel = {
    find: jest
      .fn()
      .mockReturnValue({ exec: () => Promise.resolve(solicitudes) }),
    create: jest
      .fn()
      .mockImplementation((createSolicitudDto: CreateSolicitudDto) => {
        return {
          _id: new SchemaTypes.ObjectId('2'),
          ...createSolicitudDto,
        };
      }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SolicitudService,
        {
          provide: getModelToken(Solicitud.name),
          useValue: mockSolicitudModel,
        },
      ],
    }).compile();

    service = module.get<SolicitudService>(SolicitudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('findAll() should return the array "solicituds"', async () => {
    expect(await service.findAll()).toMatchObject(solicitudes);
  });
  it('should create an space and return a solicitud with and "{id: 2}" ', async () => {
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
    expect(await service.create(newSolicitud)).toMatchObject({
      _id: expect.any(SchemaTypes.ObjectId),
    });
  });
});
