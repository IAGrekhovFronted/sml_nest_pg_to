import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeBaseScheduleController } from './employee-base-schedule.controller';
import { EmployeeBaseScheduleService } from './employee-base-schedule.service';

describe('EmployeeBaseScheduleController', () => {
  let controller: EmployeeBaseScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeBaseScheduleController],
      providers: [EmployeeBaseScheduleService],
    }).compile();

    controller = module.get<EmployeeBaseScheduleController>(EmployeeBaseScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
