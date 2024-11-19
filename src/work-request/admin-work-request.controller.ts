import { Controller, Post, Patch, Get, Body, UseGuards, Request } from '@nestjs/common';
import { WorkRequestService } from './work-request.service';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../authentication/role.guard';

@Controller('request')
@UseGuards(AuthGuard('jwt'), new RolesGuard(['Admin']))
export class AdminWorkRequestController {
  constructor(
    private readonly workRequestService: WorkRequestService
  ) { }

  @Get('findAllRequest')
  async findAllRequest(@Request() request) {
    const user: { userId: number, role: string } = request.user
    return await this.workRequestService.findAllRequest_admin()
  }

  @Get('findRequestById')
  async findRequestById(@Body() Id:{workRequestId:number}) {
    return await this.workRequestService.findRequestById(Id.workRequestId)
  }

  @Get('findRequestByEmployee')
  async findRequestByEmployee(@Body() Id:{EmployeeId:number}) {
    return await this.workRequestService.findRequestById(Id.EmployeeId)
  }

}
