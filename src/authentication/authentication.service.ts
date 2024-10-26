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
        const user = await this.userRep.findOneBy({ email: _email })
        if (user === null) throw new UnauthorizedException();
        return "Авторизация успешна"
    }
}
