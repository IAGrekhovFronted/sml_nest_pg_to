import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeBaseSchedule } from './employeeBaseSchedule.entity';
import { Employee } from 'src/employee/employee.entity';

@Injectable()
export class EmployeeBaseScheduleService {

    constructor(
        @InjectRepository(EmployeeBaseSchedule)
        private readonly employeeBaseScheduleRep:Repository<EmployeeBaseSchedule>,
        @InjectRepository(Employee)
        private readonly employee:Repository<Employee>
    ) { }

    async getBaseShedule() {
        return await this.employeeBaseScheduleRep.find()
    }

    async createBaseShedule(employeeId:number, data: Partial<EmployeeBaseSchedule>) {
        const employee = await this.employee.findOneBy({id: employeeId})
        data.employee = employee
        const newBaseShedule = this.employeeBaseScheduleRep.create(data)
        return await this.employeeBaseScheduleRep.save(newBaseShedule)
    }

    async deleteBaseShedule(id:number) {
        return this.employeeBaseScheduleRep.delete(id)
    }
    
    async updateBaseShedule(id:number, data: Partial<EmployeeBaseSchedule>) {
        return this.employeeBaseScheduleRep.update(id, data)
    }
}
