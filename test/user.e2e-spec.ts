import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getModelToken } from '@nestjs/mongoose';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const mockRepository = {
    save: jest.fn().mockImplementation((user) =>
      Promise.resolve({
        id: 1,
        ...user,
      }),
    ),
    findOne: jest.fn().mockImplementation(({ where: { email } }) =>
      Promise.resolve({
        id: 1,
        email,
      }),
    ),
    findOneByEmail: jest.fn().mockImplementation(({ where: { email } }) =>
      Promise.resolve({
        id: 1,
        email,
      }),
    ),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // .overrideGuard(AuthGuard)
      // .useValue('')
      .overrideProvider(getModelToken('User'))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => app.close());

  it('/user/:id/profile (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/user/1/profile')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJtaUBtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.jRjKTF7eCKL9BHhnWwij5LKbXdkf87UoVdVEP_7Mx8Y',
      );
    // console.log(res);

    expect(res.statusCode).toBe(200);
    expect(JSON.stringify(res.body)).toBe(`{"id":1,"email":"mi@mail.com"}`);
  });
});
