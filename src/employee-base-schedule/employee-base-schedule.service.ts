import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EmployeeBaseSchedule } from './employeeBaseSchedule.entity';
import { Employee } from '../employee/employee.entity';

@Injectable()
export class EmployeeBaseScheduleService {

    constructor(
        @InjectRepository(EmployeeBaseSchedule)
        private employeeBaseScheduleRep: Repository<EmployeeBaseSchedule>,
        @InjectRepository(Employee)
        private employeeRep: Repository<Employee>
    ) { }

    async findEmployeeBaseSchedule() {
        return await this.employeeBaseScheduleRep.find()
    }

    async createEmployeeBaseSchedule(_id, data: Partial<EmployeeBaseSchedule>) {
        const employee = await this.employeeRep.findOneBy({ id: _id })
        data.employee = employee
        return await this.employeeBaseScheduleRep.save(data)
    }

    async deleteEmployeeBaseSchedule(id: number) {
        return await this.employeeBaseScheduleRep.delete(id)
    }

    async updateEmployeeBaseShedule(id: number, data: Partial<EmployeeBaseSchedule>) {
        return await this.employeeBaseScheduleRep.update(id, data)
    }
}
