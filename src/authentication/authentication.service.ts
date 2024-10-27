import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/user.entity';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(User)
        private readonly userRep: Repository<User>
    ) { }

    async setAuth(_email: string) {
        const user = await this.userRep.findOne({
            where: { email: _email },
            relations: ['role']
        })
        if (user === null) throw new UnauthorizedException();
        console.log(user)
        return `Авторизация успешна. Роль ${user.role.description}`
    }
}
