import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkRequestService } from './work-request.service';
import { UserWorkRequestController } from './user-work-request.controller';
import { AdminWorkRequestController } from './admin-work-request.controller';

import { EmployeeBaseSchedule } from 'src/employee-base-schedule/employeeBaseSchedule.entity';
import { EmployeeSlotSchedule } from 'src/employee-slot-schedule/employeeSlotSchedule.entity';
import { Employee } from 'src/employee/employee.entity';
import { User } from 'src/user/user.entity';
import { EmployeeWorkType } from 'src/employee-work-type/employeeWorkType.entity';
import { WorkRequest } from './workRequest.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeBaseSchedule,
      EmployeeSlotSchedule,
      Employee,
      User,
      EmployeeWorkType,
      WorkRequest
    ])
  ],
  controllers: [UserWorkRequestController, AdminWorkRequestController],
  providers: [WorkRequestService],
})
export class WorkRequestModule { }


