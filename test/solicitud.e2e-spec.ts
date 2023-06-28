import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SolicitudModule } from '../src/solicitud/solicitud.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Solicitud } from '../src/solicitud/entities/solicitud.entity';
import { CreateSolicitudDto } from '../src/solicitud/dtos/create-solicitud.dto';

const solicitudes: Solicitud[] = [
  {
    id: 1,
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

describe('SolicitudController (e2e)', () => {
  let app: INestApplication;
  const mockRepository = {
    find: jest.fn().mockReturnValue(Promise.resolve(solicitudes)),
    save: jest
      .fn()
      .mockImplementation((createSolicitudDto: CreateSolicitudDto) => {
        return {
          id: 1,
          ...createSolicitudDto,
        };
      }),
  };
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SolicitudModule],
    })
      .overrideProvider(getRepositoryToken(Solicitud))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/solicitud (GET)', async () => {
    // return request(app.getHttpServer()).get('/solicitud').expect(200);
    const response = await request(app.getHttpServer()).get('/solicitud');

    expect(response.statusCode).toBe(200);
    expect(JSON.stringify(response.body)).toBe(JSON.stringify(solicitudes));
    // .expect('Hello World!');
  });
  it('/solicitud (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/solicitud')
      .send({
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
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
    });
  });
});
