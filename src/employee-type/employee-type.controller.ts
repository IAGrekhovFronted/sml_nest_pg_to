import { Controller } from '@nestjs/common';
import { EmployeeTypeService } from './employee-type.service';

@Controller('employee-type')
export class EmployeeTypeController {
  constructor(private readonly employeeTypeService: EmployeeTypeService) {}
}
