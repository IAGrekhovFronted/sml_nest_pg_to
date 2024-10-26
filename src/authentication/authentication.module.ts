import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

import { User } from 'src/user/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ])
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
