import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from "passport-jwt";

import { Role } from "src/role/role.entity";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'MySecretKey'
        })
    }

    async validate(payload:{userId:number, role:Role}) {
        return { userId: payload.userId, role: payload.role }
    }
}