import { Test, TestingModule } from '@nestjs/testing';
import { EspacioController } from './espacio.controller';
import { EspacioService } from './espacio.service';
import { CreateEspacioDto } from './dtos/create-espacio.dto';
import { ObjectId, SchemaTypes } from 'mongoose';
import { Espacio } from './schemas/espacio.schema';

const espacios: Array<{ _id: ObjectId } & Espacio> = [
  {
    _id: new SchemaTypes.ObjectId('1'),
    edificio: 'A',
    aula: '2C',
  },
];

describe('EspacioController', () => {
  let controller: EspacioController;
  const mockEspacioService = {
    findAll: jest.fn().mockImplementation(() => Promise.resolve({ espacios })),
    create: jest
      .fn()
      .mockImplementation((createEspacioDto: CreateEspacioDto) => {
        const newSpace = {
          _id: new SchemaTypes.ObjectId('2'),
          ...createEspacioDto,
        };
        espacios.push(newSpace);
        return Promise.resolve(newSpace);
      }),
  };
  //ARRANGE -
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspacioController],
      providers: [EspacioService],
    })
      .overrideProvider(EspacioService)
      .useValue(mockEspacioService)
      .compile();
    // INTANCIA DEL CONTROLLER
    controller = module.get<EspacioController>(EspacioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return a spaces list', async () => {
    expect(await controller.findAll()).toMatchObject({ espacios });
  });
  it('should create an space and return the new space "{id: 2,edificio: "B",aula: "A"}" ', async () => {
    const newSpace = {
      edificio: 'B',
      aula: 'A',
    };
    expect(await controller.create(newSpace)).toMatchObject({
      _id: expect.any(SchemaTypes.ObjectId),
    });
  });
});
