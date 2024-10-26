import { Controller, Post } from '@nestjs/common';
import { WorkRequestService } from './work-request.service';

@Controller('work-request')
export class WorkRequestController {
  constructor(private readonly workRequestService: WorkRequestService) { }

  @Post()
  async createWorkRequest(date: Date, userId: number, employeeWorkTypeId: number) {
    return await this.workRequestService.getAvailableSlot(date, userId, employeeWorkTypeId)
  }
}
