import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeWorkTypeService } from './employee-work-type.service';
import { EmployeeWorkTypeController } from './employee-work-type.controller';

import { EmployeeWorkType } from './employeeWorkType.entity';
import { EmployeeType } from 'src/employee-type/employeeType.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeWorkType,
      EmployeeType
    ])
  ],
  controllers: [EmployeeWorkTypeController],
  providers: [EmployeeWorkTypeService],
})
export class EmployeeWorkTypeModule { }
