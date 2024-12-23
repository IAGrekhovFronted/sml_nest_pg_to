import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EmployeeType } from './employeeType.entity';
import { EmployeeWorkType } from '../employee-work-type/employeeWorkType.entity';

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

    async createEmployeeType(employeeTypeId, data: Partial<EmployeeType>) {
        const workType = await this.employeeWorkTypeRep.findOneBy({ id: employeeTypeId })
        data.employeeWorkType = workType
        const employeeType = await this.emloyeeTypeRep.create(data)
        return await this.emloyeeTypeRep.save(employeeType)
    }

    async deletwEmployeeType(id: number) {
        return this.emloyeeTypeRep.delete(id)
    }

    async updateEmployeeType(_id:number, data:Partial<EmployeeType>) {
        return this.emloyeeTypeRep.update(_id, data)
    }
}
