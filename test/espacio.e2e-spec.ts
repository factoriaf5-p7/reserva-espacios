import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthGuard } from '../src/auth/guards/auth.guard';
import { ObjectId, SchemaTypes } from 'mongoose';
import { Espacio } from '../src/espacio/schemas/espacio.schema';
import { EspacioModule } from '../src/espacio/espacio.module';
import { CreateEspacioDto } from 'src/espacio/dto/create-espacio.dto';
import { getModelToken } from '@nestjs/mongoose';
import { EspacioService } from '../src/espacio/espacio.service';

const espacios: Array<{ _id: ObjectId } & Espacio> = [
  {
    _id: new SchemaTypes.ObjectId('1'),
    edificio: 'A',
    aula: '2C',
  },
];

describe('Espacio (e2e)', () => {
  let app: INestApplication;
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
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EspacioModule],
      providers: [
        EspacioService,
        {
          provide: getModelToken(Espacio.name),
          useValue: mockEspacioModel,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue('')
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
  it('/espacio (GET)', () => {
    return request(app.getHttpServer())
      .get('/espacio')
      .expect(200)
      .expect({ espacios });
  });
});
