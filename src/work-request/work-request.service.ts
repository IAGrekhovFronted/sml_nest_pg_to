import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';

import { EmployeeSlotSchedule } from 'src/employee-slot-schedule/employeeSlotSchedule.entity';
import { EmployeeBaseSchedule } from 'src/employee-base-schedule/employeeBaseSchedule.entity';
import { WorkRequest } from './workRequest.entity';

@Injectable()
export class WorkRequestService {

    constructor(
        @InjectRepository(EmployeeSlotSchedule)
        private readonly employeeSlotScheduleRep: Repository<EmployeeSlotSchedule>,

        @InjectRepository(EmployeeBaseSchedule)
        private readonly employeeBaseScheduleRep: Repository<EmployeeBaseSchedule>,

        @InjectRepository(WorkRequest)
        private readonly workRequestRep: Repository<WorkRequest>
    ) { }

    private async createSlotShedule(data: Partial<EmployeeSlotSchedule>) {
        const slot = await this.employeeSlotScheduleRep.create(data)
        return await this.employeeSlotScheduleRep.save(slot)
    }

    private async createWorkRequest(data: Partial<WorkRequest>) {
        const request = await this.workRequestRep.create(data)
        return await this.workRequestRep.save(request)
    }

    async getAvailableSlot(date: Date, userId: number, employeeWorkTypeId: number) {

        const employee = await this.employeeBaseScheduleRep.find({
            where: {
                start: MoreThan(date),
                end: LessThan(date),
            },
            select: ['employee']
        });

        let SuccessRequest: boolean = false

        // do {
        //     let startDate: Date = new Date(date);
        //     let endDate: Date = new Date(startDate);
        //     endDate.setHours(startDate.getHours() + 1);

        //     const slots = await this.employeeSlotScheduleRep.find({
        //         where: {
        //             startDate: startDate,
        //             endDate: endDate
        //         }
        //     });

        //     if (slots.length === 0) {

        //         let sendDataSlotShedule: Partial<EmployeeSlotSchedule> =
        //         {
        //             startDate: startDate,
        //             endDate: endDate,
        //             employee: employee
        //         };

        //         const createdSlot = await this.createSlotShedule(sendDataSlotShedule);

        //         let sendDataWorkRequest: Partial<WorkRequest> =
        //         {
        //             user: userId,
        //             status: "WAITING",
        //             employeeWorkType: employeeWorkTypeId,
        //             slot: createdSlot
        //         }

        //         await this.createWorkRequest(sendDataWorkRequest)
        //         SuccessRequest = true;
        //     }

        //     date.setHours(date.getHours() + 1);
        // } while (!SuccessRequest);
    }
}
