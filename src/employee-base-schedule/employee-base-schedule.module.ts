import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeBaseScheduleService } from './employee-base-schedule.service';
import { EmployeeBaseScheduleController } from './employee-base-schedule.controller';

import { EmployeeBaseSchedule } from './employeeBaseSchedule.entity';
import { Employee } from 'src/employee/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeBaseSchedule,
      Employee
    ])
  ],
  controllers: [EmployeeBaseScheduleController],
  providers: [EmployeeBaseScheduleService],
})
export class EmployeeBaseScheduleModule { }
