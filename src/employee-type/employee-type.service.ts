import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EmployeeType } from './employeeType.entity';
import { EmployeeWorkType } from 'src/employee-work-type/employeeWorkType.entity';

@Injectable()
export class EmployeeTypeService {

    constructor(
        @InjectRepository(EmployeeType)
        private readonly emloyeeTypeRep: Repository<EmployeeType>,

        @InjectRepository(EmployeeWorkType)
        private readonly employeeWorkTypeRep: Repository<EmployeeWorkType>
    ) { }

    async findAllEmployeeType() {
        return await this.emloyeeTypeRep.find()
    }

    async createEmployeeType(data: Partial<EmployeeType>): Promise<EmployeeType> {
        const workType = await this.employeeWorkTypeRep.findOneBy(data.employeeWorkType)
        data.employeeWorkType = workType
        const employeeType = await this.emloyeeTypeRep.create(data)
        return await this.emloyeeTypeRep.save(employeeType)
    }

    async deletwEmployeeType(id: number) {
        return this.emloyeeTypeRep.delete(id)
    }

    async updateEmployeeType(id:number, data: Partial<EmployeeType>) {
        return this.emloyeeTypeRep.update(id, data)
    }
}
