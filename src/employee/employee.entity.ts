import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';

import { EmployeeType } from '../employee-type/employeeType.entity';
import { EmployeeBaseSchedule } from '../employee-base-schedule/employeeBaseSchedule.entity';
import { EmployeeSlotSchedule } from '../employee-slot-schedule/employeeSlotSchedule.entity';

@Entity({schema: 'public'})
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => EmployeeType, employeeType => employeeType.employee)
    @JoinColumn({ name: 'EmployeeTypeId' })
    type: EmployeeType;

    @OneToMany(() => EmployeeBaseSchedule, baseSchedule => baseSchedule.employee)
    employeeBaseSchedule: EmployeeBaseSchedule[];

    @OneToMany(() => EmployeeSlotSchedule, slotSchedule => slotSchedule.employee)
    employeeSlotSchedule: EmployeeSlotSchedule[];
}
