import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';

import { Role } from '../role/role.entity';
import { WorkRequest } from '../work-request/workRequest.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    test: string;

    @ManyToOne(() => Role, role => role.users, { nullable: true })
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @OneToMany(() => WorkRequest, workRequest => workRequest.user)
    workRequest: WorkRequest[];
}