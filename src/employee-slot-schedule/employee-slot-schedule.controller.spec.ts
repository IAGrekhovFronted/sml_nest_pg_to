import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeSlotScheduleController } from './employee-slot-schedule.controller';
import { EmployeeSlotScheduleService } from './employee-slot-schedule.service';

describe('EmployeeSlotScheduleController', () => {
  let controller: EmployeeSlotScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeSlotScheduleController],
      providers: [EmployeeSlotScheduleService],
    }).compile();

    controller = module.get<EmployeeSlotScheduleController>(EmployeeSlotScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
