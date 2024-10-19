import { Controller } from '@nestjs/common';
import { EmployeeBaseScheduleService } from './employee-base-schedule.service';

@Controller('employee-base-schedule')
export class EmployeeBaseScheduleController {
  constructor(private readonly employeeBaseScheduleService: EmployeeBaseScheduleService) {}
}
