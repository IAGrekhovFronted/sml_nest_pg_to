import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeTypeService } from './employee-type.service';
import { EmployeeTypeController } from './employee-type.controller';

import { EmployeeType } from './employeeType.entity';
import { EmployeeWorkType } from 'src/employee-work-type/employeeWorkType.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeType,
      EmployeeWorkType
    ])
  ],
  controllers: [EmployeeTypeController],
  providers: [EmployeeTypeService],
})
export class EmployeeTypeModule { }
