import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import mongoose from 'mongoose';
import { InternalServerErrorException } from '@nestjs/common';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: UserService,
          useFactory: () => ({
            findByEmail: jest.fn(() => true),
            create: jest.fn((data: RegisterDto) =>
              Promise.resolve({ _id: new mongoose.Types.ObjectId(1), ...data }),
            ),
          }),
        },
        {
          provide: JwtService,
          useFactory: () => ({
            signAsync: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should encrypt password', async () => {
    const password = '1234';
    const hashMock = jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation((password, salt) =>
        Promise.resolve('passwordEncrypted'),
      );

    const genSalt = jest
      .spyOn(bcrypt, 'genSalt')
      .mockImplementation((numSalts) => Promise.resolve('salt'));

    const result = await service.encrypt(password);

    expect(genSalt).toHaveBeenCalledWith(10);
    expect(hashMock).toHaveBeenCalledWith(password, 'salt');
    expect(result).toBe('passwordEncrypted');
  });
  it('should return InternalServerErrorException when some error ocurred when encrypting', async () => {
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.reject(''));
    expect(await service.encrypt('')).rejects.toThrow(
      new Error('encripting password failed'),
    );
  });
  it('should compare password and hashed password', async () => {
    const password = '1234';
    const hashPassword = 'any';
    const compare = jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(true));

    const result = await service.verifyPassword(password, hashPassword);

    expect(compare).toHaveBeenCalledWith(password, hashPassword);
    expect(result).toBeTruthy();
  });
  it('should register an user', async () => {
    const data: RegisterDto = {
      name: 'lisa',
      email: 'lisa@mail.com',
      password: '1234',
      createAt: new Date('10/01/01'),
      updateAt: new Date('10/01/01'),
      hash_refresh_token: '',
    };
    const encryptSpy = jest
      .spyOn(service, 'encrypt')
      .mockImplementation(() => Promise.resolve('hashedPassword'));
    const result = await service.register(data);
    expect(encryptSpy).toHaveBeenCalledWith(data.password);
    expect(result).toMatchObject({
      _id: expect.any(mongoose.Types.ObjectId),
    });
  });
});
