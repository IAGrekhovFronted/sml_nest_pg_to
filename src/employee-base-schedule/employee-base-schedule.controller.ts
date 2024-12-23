import { Controller, Get, Post, Delete, Patch, Body, UseGuards } from '@nestjs/common';

import { EmployeeBaseScheduleService } from './employee-base-schedule.service';
import { EmployeeBaseSchedule } from './employeeBaseSchedule.entity';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../authentication/role.guard';

@Controller('base-schedule')
@UseGuards(AuthGuard('jwt'), new RolesGuard(['Admin']))
export class EmployeeBaseScheduleController {
  constructor(private readonly employeeBaseScheduleService: EmployeeBaseScheduleService) { }

  @Get('find')
  async findEmployeeBaseShedule() {
    return await this.employeeBaseScheduleService.findEmployeeBaseSchedule()
  }

  @Post('create')
  async createEmployeeBaseShedule(@Body() data: Partial<EmployeeBaseSchedule>) {
    const employeeId = data.employee
    return await this.employeeBaseScheduleService.createEmployeeBaseSchedule(employeeId, data)
  }

  @Delete('delete')
  async deleteEmployeeBaseShedule(@Body() id: { id: number }) {
    return await this.employeeBaseScheduleService.deleteEmployeeBaseSchedule(id.id)
  }

  @Patch('update')
  async updateEmployeeBaseShedule(@Body() data: { id: number, shedule: Partial<EmployeeBaseSchedule> }) {
    return await this.employeeBaseScheduleService.updateEmployeeBaseShedule(data.id, data.shedule)
  }

}
