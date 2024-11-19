import { Test, TestingModule } from '@nestjs/testing';
import { UserWorkRequestController } from './user-work-request.controller';
import { WorkRequestService } from './work-request.service';

describe('UserWorkRequestController', () => {
  let controller: UserWorkRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserWorkRequestController],
      providers: [WorkRequestService],
    }).compile();

    controller = module.get<UserWorkRequestController>(UserWorkRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
