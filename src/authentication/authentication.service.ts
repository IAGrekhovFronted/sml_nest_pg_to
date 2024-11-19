import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/user.entity';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(User)
        private readonly userRep: Repository<User>,

        private readonly jwtService: JwtService
    ) { }

    async setAuth(_email: string) {
        const user = await this.userRep.findOne({
            where: { email: _email },
            relations: ['role']
        })
        if (user === null) throw new UnauthorizedException();
        const payload = { userId: user.id, role: user.role.description }

        return { access_token: await this.jwtService.signAsync(payload) }
    }
}
