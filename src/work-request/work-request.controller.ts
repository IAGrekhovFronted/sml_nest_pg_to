import { Controller, Post, Patch, Body } from '@nestjs/common';
import { WorkRequestService } from './work-request.service';

@Controller('request')
export class WorkRequestController {
  constructor(private readonly workRequestService: WorkRequestService) { }

  @Post('create')
  async createWorkRequest(@Body() data: { date: Date, userId: number, employeeWorkTypeId: number }) {
    return await this.workRequestService.getAvailableSlot(data.date, data.userId, data.employeeWorkTypeId)
  }

  @Patch('canceled')
  async canceledWorkRequest(@Body() idWorkRequest:{ id:number}) {
    return await this.workRequestService.cancelRequest(idWorkRequest.id)
  }
}
