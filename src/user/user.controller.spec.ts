import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { User } from './user.entity';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    createUser: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService
        }
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create', async () => {
    const data: Partial<User> = {
      email: 'MockEmail',
      name: "MockName"
    }

    mockUserService.createUser.mockReturnValue('Create Success')

    const result = await controller.createUser(data)

    expect(result).toEqual('Create Success')
  })
});
