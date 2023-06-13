import { Test, TestingModule } from '@nestjs/testing';
import { EspacioService } from './espacio.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
import { Espacio } from './schemas/espacio.schema';
import { CreateEspacioDto } from './dtos/create-espacio.dto';
import { getModelToken } from '@nestjs/mongoose';
import { ObjectId, SchemaTypes } from 'mongoose';

const espacios: Array<{ _id: ObjectId } & Espacio> = [
  {
    _id: new SchemaTypes.ObjectId('1'),
    edificio: 'A',
    aula: '2C',
  },
];

describe('EspacioService', () => {
  let service: EspacioService;
  const mockEspacioModel = {
    find: jest.fn().mockReturnValue({ exec: () => Promise.resolve(espacios) }),
    create: jest
      .fn()
      .mockImplementation((createEspacioDto: CreateEspacioDto) => {
        return {
          _id: new SchemaTypes.ObjectId('1'),
          ...createEspacioDto,
        };
      }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EspacioService,
        {
          provide: getModelToken(Espacio.name),
          useValue: mockEspacioModel,
        },
      ],
    }).compile();

    service = module.get<EspacioService>(EspacioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('findAll() should return the array "espacios"', async () => {
    expect(await service.findAll()).toMatchObject(espacios);
  });
  it('should create an space and return the new space "{id: 2,edificio: "B",aula: "A"}" ', async () => {
    const newSpace = {
      edificio: 'B',
      aula: 'A',
    };
    expect(await service.create(newSpace)).toMatchObject({
      _id: expect.any(SchemaTypes.ObjectId),
    });
  });
});
