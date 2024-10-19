import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeSlotScheduleService } from './employee-slot-schedule.service';

describe('EmployeeSlotScheduleService', () => {
  let service: EmployeeSlotScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeSlotScheduleService],
    }).compile();

    service = module.get<EmployeeSlotScheduleService>(EmployeeSlotScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
