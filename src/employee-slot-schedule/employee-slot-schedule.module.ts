import { Module } from '@nestjs/common';
import { EmployeeSlotScheduleService } from './employee-slot-schedule.service';
import { EmployeeSlotScheduleController } from './employee-slot-schedule.controller';

@Module({
  controllers: [EmployeeSlotScheduleController],
  providers: [EmployeeSlotScheduleService],
})
export class EmployeeSlotScheduleModule {}
