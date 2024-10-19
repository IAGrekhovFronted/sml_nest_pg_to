import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';

import { Role } from 'src/role/role.entity';
import { WorkRequest } from 'src/work-request/workRequest.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    name: string;

    @ManyToOne(() => Role, role => role.users, { nullable: true })
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @OneToMany(() => WorkRequest, workRequest => workRequest.user)
    workRequest: WorkRequest[];
}