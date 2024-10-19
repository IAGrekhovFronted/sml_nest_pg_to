import { Module } from '@nestjs/common';
import { WorkRequestService } from './work-request.service';
import { WorkRequestController } from './work-request.controller';

@Module({
  controllers: [WorkRequestController],
  providers: [WorkRequestService],
})
export class WorkRequestModule {}
