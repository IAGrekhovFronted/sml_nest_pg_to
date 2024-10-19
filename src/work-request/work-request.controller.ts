import { Controller } from '@nestjs/common';
import { WorkRequestService } from './work-request.service';

@Controller('work-request')
export class WorkRequestController {
  constructor(private readonly workRequestService: WorkRequestService) {}
}
