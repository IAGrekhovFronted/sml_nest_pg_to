import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';

import { Employee } from 'src/employee/employee.entity';
import { EmployeeWorkType } from 'src/employeeWorkType/employeeWorkType.entity';

@Entity()
export class EmployeeType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    title: string;

    @ManyToOne(() => EmployeeWorkType, employeeWorkType => employeeWorkType.employeeType, { nullable: true })
    @JoinColumn({ name: 'workTypeId' })
    employeeWorkType: EmployeeWorkType;

    @OneToMany(() => Employee, employee => employee.type)
    employee: Employee[];
}