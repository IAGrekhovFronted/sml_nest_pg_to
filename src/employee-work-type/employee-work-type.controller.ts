import { Controller } from '@nestjs/common';
import { EmployeeWorkTypeService } from './employee-work-type.service';

@Controller('employee-work-type')
export class EmployeeWorkTypeController {
  constructor(private readonly employeeWorkTypeService: EmployeeWorkTypeService) {}
}
