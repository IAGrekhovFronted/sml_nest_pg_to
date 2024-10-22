import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { Employee } from 'src/employee/employee.entity';

@Entity()
export class EmployeeBaseSchedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start: Date;

    @Column()
    end: Date;

    @ManyToOne(() => Employee, employee => employee.employeeBaseSchedule)
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;
}