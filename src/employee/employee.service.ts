import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Employee } from './employee.entity';
import { EmployeeType } from 'src/employee-type/employeeType.entity';

@Injectable()
export class EmployeeService {

    constructor(
        @InjectRepository(Employee)
        private employeeRep: Repository<Employee>,

        @InjectRepository(EmployeeType)
        private employeeTypeRep: Repository<EmployeeType>
    ) { }

    async createEmployee(_id, data: Partial<Employee>) {
        const employeeType = await this.employeeTypeRep.findOneBy({ id: _id })
        data.type = employeeType

        const employee = this.employeeRep.create(data)
        return await this.employeeRep.save(employee)
    }

    async deleteEmployee(id: { id: number }) {
        await this.employeeRep.delete(id)
        return await `Сотрудник с id ${id.id} удален`
    }

    async patchEmployee(idEmployee, idEmployeeType, data: Partial<Employee>) {

        const employeeType = await this.employeeTypeRep.findOneBy({id: idEmployeeType})
        data.type = employeeType
        await this.employeeRep.update(idEmployee, data)
    }
}
