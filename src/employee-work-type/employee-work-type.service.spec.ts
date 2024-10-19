import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeWorkTypeService } from './employee-work-type.service';

describe('EmployeeWorkTypeService', () => {
  let service: EmployeeWorkTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeWorkTypeService],
    }).compile();

    service = module.get<EmployeeWorkTypeService>(EmployeeWorkTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
