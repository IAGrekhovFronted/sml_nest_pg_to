import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

import { JwtStrategy } from './authentication.strategy';


import { User } from 'src/user/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'MySecretKey',
      signOptions: {expiresIn: '60s'}
    })
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy],
})
export class AuthenticationModule {}
