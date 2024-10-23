import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { User } from '../user/user.entity';
import { EmployeeSlotSchedule } from '../employee-slot-schedule/employeeSlotSchedule.entity.ts';
import { EmployeeWorkType } from '../employee-work-type/employeeWorkType.entity.ts';

@Entity()
export class WorkRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.workRequest)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => EmployeeSlotSchedule, slot => slot.workRequest)
    @JoinColumn({ name: 'employeeSlotScheduleId' })
    slot: EmployeeSlotSchedule;

    @ManyToOne(() => EmployeeWorkType, employeeWorkType => employeeWorkType.workRequest)
    @JoinColumn({ name: 'employeeWorkTypeId' })
    employeeWorkType: EmployeeWorkType;

    @Column()
    status: string;

    @Column()
    userId: number;

    @Column()
    employeeSlotScheduleId: number;

    @Column()
    employeeWorkTypeId: number;
}