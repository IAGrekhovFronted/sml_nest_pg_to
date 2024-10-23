import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';

import { Employee } from '../employee/employee.entity.ts';
import { WorkRequest } from '../work-request/workRequest.entity.ts';

@Entity()
export class EmployeeSlotSchedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @ManyToOne(() => Employee, employee => employee.employeeSlotSchedule)
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;

    @OneToMany(() => WorkRequest, workRequest => workRequest.slot)
    workRequest: WorkRequest[];
}