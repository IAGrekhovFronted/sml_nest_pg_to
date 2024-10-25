import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body
} from '@nestjs/common';
import { EmployeeTypeService } from './employee-type.service';

import { EmployeeType } from './employeeType.entity';

@Controller('employeetype')
export class EmployeeTypeController {
  constructor(private readonly employeeTypeService: EmployeeTypeService) { }
  @Get('findAll')
  async findAllEmployeeType() {
    return this.employeeTypeService.findAllEmployeeType()
  }

  @Post('create')
  async createEmployeeType(@Body() data: Partial<EmployeeType>) {

    return await this.employeeTypeService.createEmployeeType(data.employeeWorkType, data)
  }

  @Delete('delete')
  async deleteEmployeeType(@Body() id: { id: number }) {
    return await this.employeeTypeService.deletwEmployeeType(id.id)
  }

  @Patch('update')
  async updateEmployeeType(@Body() data:{employeeTypeId: number, employeeType:Partial<EmployeeType>}) {
    return await this.employeeTypeService.updateEmployeeType(data.employeeTypeId, data.employeeType)
  }
}