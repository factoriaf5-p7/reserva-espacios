import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user/entities/user.entity';
import { AuthGuard } from '../src/auth/guards/auth.guard';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const mockRepository = {};
  const mockGuard = {
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideGuard(AuthGuard)
      .useValue('')
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/:id/profile (POST)', () => {
    return request(app.getHttpServer())
      .get('/user/1/profile')
      .expect(200)
      .expect('Hello World!');
  });
});
