import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

import { Employee } from './employee.entity';
import { EmployeeType } from 'src/employee-type/employeeType.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      EmployeeType
    ])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule { }
