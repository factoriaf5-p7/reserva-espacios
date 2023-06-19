import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  const mockUserRepository = {
    save: jest.fn().mockImplementation((user) => ({
      id: 1,
      ...user,
    })),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user without password when createUserDto is sent', async () => {
    const createUserDTO = {
      name: 'lisa',
      email: 'lisa@mail.com',
      password: '1234',
    };
    expect(await service.create(createUserDTO)).toMatchObject({
      id: expect.any(Number),
    });
  });
});
