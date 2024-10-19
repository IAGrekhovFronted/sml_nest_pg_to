import { Module } from '@nestjs/common';
import { EmployeeWorkTypeService } from './employee-work-type.service';
import { EmployeeWorkTypeController } from './employee-work-type.controller';

@Module({
  controllers: [EmployeeWorkTypeController],
  providers: [EmployeeWorkTypeService],
})
export class EmployeeWorkTypeModule {}
