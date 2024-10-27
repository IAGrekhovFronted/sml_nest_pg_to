import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';

import { EmployeeSlotSchedule } from 'src/employee-slot-schedule/employeeSlotSchedule.entity';
import { EmployeeBaseSchedule } from 'src/employee-base-schedule/employeeBaseSchedule.entity';
import { WorkRequest } from './workRequest.entity';
import { Employee } from 'src/employee/employee.entity';
import { User } from 'src/user/user.entity';
import { EmployeeWorkType } from 'src/employee-work-type/employeeWorkType.entity';

@Injectable()
export class WorkRequestService {

    constructor(
        @InjectRepository(EmployeeSlotSchedule)
        private readonly employeeSlotScheduleRep: Repository<EmployeeSlotSchedule>,

        @InjectRepository(EmployeeBaseSchedule)
        private readonly employeeBaseScheduleRep: Repository<EmployeeBaseSchedule>,

        @InjectRepository(User)
        private readonly userRep: Repository<User>,

        @InjectRepository(EmployeeWorkType)
        private readonly employeeWorkTypeRep: Repository<EmployeeWorkType>,

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

    private async getEmployee(date: Date) {
        const employeeSlot: EmployeeBaseSchedule = await this.employeeBaseScheduleRep.findOne({
            where: {
                start: LessThan(date),
                end: MoreThan(date),
            },
            relations: ['employee']
        });

        return employeeSlot.employee
    }

    private async getUser(userId: number) {
        const user: User = await this.userRep.findOne({
            where: {
                id: userId
            }
        })

        return user
    }

    private async getEmployeeWorkType(employeeWorkTypeId: number) {
        const employeeWorkType: EmployeeWorkType = await this.employeeWorkTypeRep.findOne({
            where: {
                id: employeeWorkTypeId
            }
        })

        return employeeWorkType
    }

    async getAvailableSlot(date: Date, userId: number, employeeWorkTypeId: number) {

        const employee: Employee = await this.getEmployee(date)

        const user: User = await this.getUser(userId)

        const employeeWorkType: EmployeeWorkType = await this.getEmployeeWorkType(employeeWorkTypeId)

        let SuccessRequest: boolean = false

        let _date: Date = new Date(date);

        do {

            let startDate: Date = _date
            let endDate: Date = new Date(startDate);

            endDate.setHours(startDate.getHours() + 1);

            const slots = await this.employeeSlotScheduleRep.find({
                where: {
                    startDate: startDate,
                    endDate: endDate
                }
            });

            if (slots.length === 0) {

                let sendDataSlotShedule: Partial<EmployeeSlotSchedule> =
                {
                    startDate: startDate,
                    endDate: endDate,
                    employee: employee
                };

                const createdSlot = await this.createSlotShedule(sendDataSlotShedule);

                let sendDataWorkRequest: Partial<WorkRequest> =
                {
                    user: user,
                    status: "WAITING",
                    employeeWorkType: employeeWorkType,
                    slot: createdSlot
                }

                await this.createWorkRequest(sendDataWorkRequest)
                SuccessRequest = true;
            }
            _date.setHours(_date.getHours() + 1);
        } while (!SuccessRequest);
    }

    async cancelRequest(idWorkRequest: number) {
        const workRequest = await this.workRequestRep.findOne({
            where: {
                id: idWorkRequest
            }
        })
        workRequest.status = "CANCELED"
        return await this.workRequestRep.save(workRequest)
    }
}
