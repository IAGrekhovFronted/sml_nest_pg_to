import { Test, TestingModule } from '@nestjs/testing';
import { WorkRequestController } from './work-request.controller';
import { WorkRequestService } from './work-request.service';

describe('WorkRequestController', () => {
  let controller: WorkRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkRequestController],
      providers: [WorkRequestService],
    }).compile();

    controller = module.get<WorkRequestController>(WorkRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
