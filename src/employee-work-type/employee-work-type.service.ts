import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeWorkType } from './employeeWorkType.entity';
import { EmployeeType } from 'src/employee-type/employeeType.entity';

@Injectable()
export class EmployeeWorkTypeService {

    constructor(
        @InjectRepository(EmployeeWorkType)
        private readonly worktypeRep: Repository<EmployeeWorkType>,

        @InjectRepository(EmployeeType)
        private readonly employeeType: Repository<EmployeeType>
    ) { }

    async findAll() {
        return await this.worktypeRep.find()
    }

    async createWorkType(data: Partial<EmployeeWorkType>) {
        const workType = await this.worktypeRep.create(data)
        return await this.worktypeRep.save(workType)
    }

    async deleteWorkType(_id: number) {
        return await this.worktypeRep.delete(_id)
    }

    async patchWorkType(idWorkType: number, data: Partial<EmployeeWorkType>) {
        return await this.worktypeRep.update(idWorkType, data)
    }
}
