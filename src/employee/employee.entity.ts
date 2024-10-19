import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';

import { EmployeeType } from 'src/employeeType/employeeType.entity';
import { EmployeeBaseSchedule } from 'src/employeeBaseSchedule/employeeBaseSchedule.entity';
import { EmployeeSlotSchedule } from 'src/employeeSlotSchedule/employeeSlotSchedule.entity';

@Entity()
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
