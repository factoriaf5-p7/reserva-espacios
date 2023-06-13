import { Test, TestingModule } from '@nestjs/testing';
import { EspacioService } from './espacio.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Espacio } from './entities/espacio.entity';
import { CreateEspacioDto } from './dtos/create-espacio.dto';

const espacios: any = [
  {
    id: 1,
    edificio: 'A',
    aula: '2C',
  },
];

describe('EspacioService', () => {
  let service: EspacioService;
  const mockEspacioRepositoryService = {
    find: jest.fn().mockReturnValue(Promise.resolve(espacios)),
    save: jest.fn().mockImplementation((createEspacioDto: CreateEspacioDto) => {
      return {
        id: 1,
        ...CreateEspacioDto,
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EspacioService,
        {
          provide: getRepositoryToken(Espacio),
          useValue: mockEspacioRepositoryService,
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
      id: expect.any(Number),
    });
  });
});
