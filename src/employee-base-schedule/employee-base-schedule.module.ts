import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeBaseScheduleService } from './employee-base-schedule.service';
import { EmployeeBaseScheduleController } from './employee-base-schedule.controller';

import { Employee } from 'src/employee/employee.entity';
import { EmployeeBaseSchedule } from './employeeBaseSchedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      EmployeeBaseSchedule
    ])
  ],
  controllers: [EmployeeBaseScheduleController],
  providers: [EmployeeBaseScheduleService],
})
export class EmployeeBaseScheduleModule {}
