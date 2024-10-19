import { Module } from '@nestjs/common';
import { EmployeeBaseScheduleService } from './employee-base-schedule.service';
import { EmployeeBaseScheduleController } from './employee-base-schedule.controller';

@Module({
  controllers: [EmployeeBaseScheduleController],
  providers: [EmployeeBaseScheduleService],
})
export class EmployeeBaseScheduleModule {}
