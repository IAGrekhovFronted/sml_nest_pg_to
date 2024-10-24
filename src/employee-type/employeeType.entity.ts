import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';

import { Employee } from '../employee/employee.entity';
import { EmployeeWorkType } from '../employee-work-type/employeeWorkType.entity';

@Entity()
export class EmployeeType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    title: string;

    @ManyToOne(() => EmployeeWorkType, employeeWorkType => employeeWorkType.employeeType, { nullable: true })
    @JoinColumn({ name: 'workTypeId' })
    employeeWorkType: EmployeeWorkType;

    @OneToMany(() => Employee, employee => employee.type, { onDelete: 'CASCADE' })
    employee: Employee[];
}