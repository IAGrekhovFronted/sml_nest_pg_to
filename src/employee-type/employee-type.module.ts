import { Module } from '@nestjs/common';
import { EmployeeTypeService } from './employee-type.service';
import { EmployeeTypeController } from './employee-type.controller';

@Module({
  controllers: [EmployeeTypeController],
  providers: [EmployeeTypeService],
})
export class EmployeeTypeModule {}
