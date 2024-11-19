import { Controller, Post, Patch, Get, Body, UseGuards, Request } from '@nestjs/common';
import { WorkRequestService } from './work-request.service';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../authentication/role.guard';

import { EmployeeRequest } from './employee-request.interface';

@Controller('request')
@UseGuards(AuthGuard('jwt'), new RolesGuard(['User']))
export class UserWorkRequestController {
  constructor(
    private readonly workRequestService: WorkRequestService
  ) { }

  @Get('findAllRequest')
  async findAllRequest(@Request() request) {
    const user: { userId: number, role: string } = request.user
    return await this.workRequestService.findAllRequest_user(user.userId)
  }

  @Get('findOneRequest')
  async findOneRequest(@Body() Id: { workRequestId: number }) {
    return await this.workRequestService.findRequestById(Id.workRequestId)
  }

  @Post('create')
  async createWorkRequest(@Body() data: { date: Date, employeeWorkTypeId: number, employee?: Array<EmployeeRequest> }, @Request() request) {

    const arrEmployee: Array<EmployeeRequest> = data?.employee
    const user: { userId: number, role: string } = request.user

    if (data.employee) {
      arrEmployee.forEach(
        async item => {
          return await this.workRequestService.getAvailableSlot(data.date, user.userId, data.employeeWorkTypeId, item)
        }
      )
    } else {
      return await this.workRequestService.getAvailableSlot(data.date, user.userId, data.employeeWorkTypeId)
    }

  }

  @Patch('canceled')
  async canceledWorkRequest(@Body() idWorkRequest: { id: number }) {
    return await this.workRequestService.cancelRequest(idWorkRequest.id)
  }
}
