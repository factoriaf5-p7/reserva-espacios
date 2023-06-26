import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import mongoose from 'mongoose';
import { AuthGuard } from '../src/auth/guards/auth.guard';
import { Espacio } from '../src/espacio/schemas/espacio.schema';
import { CreateEspacioDto } from '../src/espacio/dto/create-espacio.dto';
import { getModelToken } from '@nestjs/mongoose';
import { EspacioService } from '../src/espacio/espacio.service';
import { AppModule } from '../src/app.module';
import { EspacioModule } from '../src/espacio/espacio.module';

const espacios: Array<{ _id: mongoose.Types.ObjectId } & Espacio> = [
  {
    _id: new mongoose.Types.ObjectId('63d132a01df728779cf20954'),
    edificio: 'A',
    aula: '2C',
  },
];

describe('Espacio (e2e)', () => {
  let app: INestApplication;
  const mockEspacioModel = {
    find: jest.fn().mockImplementationOnce(() => ({
      exec: jest.fn().mockResolvedValue({ espacios }),
    })),
    // create: jest
    //   .fn()
    //   .mockImplementation((createEspacioDto: CreateEspacioDto) => {
    //     return {
    //       _id,
    //       ...createEspacioDto,
    //     };
    // }),
  };
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EspacioModule],
      // providers: [
      //   EspacioService,
      //   {
      //     provide: getModelToken(Espacio.name),
      //     useValue: mockEspacioModel,
      //   },
      // ],
    })
      .overrideGuard(AuthGuard)
      .useValue('')
      .overrideProvider(getModelToken('Espacio'))
      .useValue(mockEspacioModel)
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
  it('/espacio (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/espacio');

    expect(response.statusCode).toBe(200);
    expect(JSON.stringify(response.body.espacios)).toBe(
      JSON.stringify(espacios),
    );
  });
});
