import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeBaseScheduleService } from './employee-base-schedule.service';

describe('EmployeeBaseScheduleService', () => {
  let service: EmployeeBaseScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeBaseScheduleService],
    }).compile();

    service = module.get<EmployeeBaseScheduleService>(EmployeeBaseScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
