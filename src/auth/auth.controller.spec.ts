import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { LoginDto } from './dtos/login.dto';
import { Request, Response } from 'express';
describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  const mockAuthService = {
    validateUser: jest
      .fn()
      .mockReturnValue(Promise.resolve({ accessToken: 'this is a token' })),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return an accessToken when a valid user is provided', async () => {
    const req = {
      body: {
        user: {
          email: 'test@mail.com',
          password: '1234',
        },
      },
    } as Request;
    expect(await controller.signin(req.body)).toMatchObject({
      accessToken: 'this is a token',
    });
  });
  // it('should invoke cookie method with a token when a valid user is provided', async () => {
  //   const req = {
  //     body: {
  //       user: {
  //         email: 'test@mail.com',
  //         password: '1234',
  //       },
  //     },
  //   } as Request;

  //   const { accessToken } = await service.validateUser(req.body);

  //   const responseMock = {
  //     cookie: jest.fn().mockImplementation(() => responseMock),
  //     status: jest.fn().mockImplementation(() => responseMock),
  //     send: jest.fn(),
  //   } as unknown as Response;

  //   await controller.signin(req, responseMock);

  //   // expect(responseMock.cookie).toHaveBeenCalled();
  //   // expect(responseMock.status).toHaveBeenCalled();
  //   // expect(responseMock.send).toHaveBeenCalled();

  //   expect(responseMock.cookie).toHaveBeenCalledWith(
  //     'access_token',
  //     accessToken,
  //     {
  //       httpOnly: true,
  //       secure: false,
  //       sameSite: 'lax',
  //       // expires: new Date(Date.now() + 2 * 24 * 60 * 1000),
  //     },
  //   );
  //   expect(responseMock.status).toHaveBeenCalledWith(200);
  //   expect(responseMock.send).toHaveBeenCalledWith({ status: 'ok' });
  // });
});
