import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Types } from 'mongoose';
import { CreateUserDto } from './dto';

describe('UserService', () => {
  let service: UserService;
  const mockModel = {
    create: jest.fn().mockImplementation((createUserDto) =>
      Promise.resolve({
        _id: new Types.ObjectId(1),
        ...createUserDto,
      }),
    ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a new User', async () => {
    const createdUserDto: CreateUserDto = {
      name: 'lisa',
      email: 'lisa@mail.com',
      password: '1234',
      createAt: new Date('01/01/01'),
      updateAt: new Date('01/01/01'),
      hash_refresh_token: '',
    };
    const result = await service.create(createdUserDto);
    console.log(result);
    expect(result).toMatchObject({
      _id: expect.any(Types.ObjectId),
    });
  });
});