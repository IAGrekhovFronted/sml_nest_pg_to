import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WorkRequest } from '../work-request/workRequest.entity';

describe('UserService', () => {
  let service: UserService;

  const mockUser = {
    create: jest.fn(),
    save: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUser
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create', async () => {
    const data: Partial<User> = {
      email: 'MockEmail',
      name: "MockName"
    }

    const createUser: User = {
      id: 1,
      email: data.email,
      name: data.name,
      role: new Role(),
      workRequest: [new WorkRequest]
    }

    mockUser.create.mockReturnValue(createUser)
    mockUser.save.mockReturnValue('Success save')

    const result = await service.createUser(data)
    expect(result).toEqual('Success save')
    expect(mockUser.create).toHaveBeenCalledWith(data)
  })
});

