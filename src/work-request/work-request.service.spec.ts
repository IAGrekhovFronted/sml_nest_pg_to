import { Test, TestingModule } from '@nestjs/testing';
import { WorkRequestService } from './work-request.service';

describe('WorkRequestService', () => {
  let service: WorkRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkRequestService],
    }).compile();

    service = module.get<WorkRequestService>(WorkRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
