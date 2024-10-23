import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';

import { EmployeeType } from '../employee-type/employeeType.entity.ts';
import { WorkRequest } from '../work-request/workRequest.entity.ts';

@Entity()
export class EmployeeWorkType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    title: string;

    @Column()
    price: number;

    @OneToMany(() => EmployeeType, employeeType => employeeType.employeeWorkType)
    employeeType: EmployeeType[];

    @OneToMany(() => WorkRequest, workRequest => workRequest.employeeWorkType)
    workRequest: WorkRequest[];
}