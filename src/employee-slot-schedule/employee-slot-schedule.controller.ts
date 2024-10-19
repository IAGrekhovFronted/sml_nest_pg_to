import { Controller } from '@nestjs/common';
import { EmployeeSlotScheduleService } from './employee-slot-schedule.service';

@Controller('employee-slot-schedule')
export class EmployeeSlotScheduleController {
  constructor(private readonly employeeSlotScheduleService: EmployeeSlotScheduleService) {}
}
