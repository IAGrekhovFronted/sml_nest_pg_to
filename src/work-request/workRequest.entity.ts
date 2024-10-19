import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { User } from 'src/user/user.entity';
import { EmployeeSlotSchedule } from 'src/employeeSlotSchedule/employeeSlotSchedule.entity';
import { EmployeeWorkType } from 'src/employeeWorkType/employeeWorkType.entity';

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