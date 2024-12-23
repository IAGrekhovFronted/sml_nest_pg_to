import {
  Controller,
  Post,
  Delete,
  Get,
  Patch,
  Body,
  UseGuards
} from '@nestjs/common';

import { EmployeeWorkTypeService } from './employee-work-type.service';
import { EmployeeWorkType } from './employeeWorkType.entity';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../authentication/role.guard'; 

@Controller('worktype')
@UseGuards(AuthGuard('jwt'), new RolesGuard(['Admin']))
export class EmployeeWorkTypeController {
  constructor(private readonly employeeWorkTypeService: EmployeeWorkTypeService) { }

  @Get('findAll')
  async findAllWorkType() {
    return this.employeeWorkTypeService.findAll()
  }

  @Post('create')
  async createWorkType(@Body() data: Partial<EmployeeWorkType>) {
    
    return await this.employeeWorkTypeService.createWorkType(data)
  }

  @Delete('delete')
  async deleteWorkType(@Body() id: { id: number }) {
    return await this.employeeWorkTypeService.deleteWorkType(id.id)
  }

  @Patch('update')
  async updateWorkType(@Body() Body: { id: number, data: Partial<EmployeeWorkType> }) {
    return await this.employeeWorkTypeService.patchWorkType(Body.id, Body.data)
  }
}
