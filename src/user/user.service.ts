import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRep: Repository<User>
    ) { }

    async createUser(data:Partial<User>) {
        const user = this.userRep.create(data)
        return this.userRep.save(user)
    }
}
