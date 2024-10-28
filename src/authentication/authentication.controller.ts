import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from '@nestjs/passport';

import { RolesGuard } from './role.guard';


@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('login')
  async setAuth(@Body() email:{ email: string }) {
    return this.authenticationService.setAuth(email.email)
  }

  @Post('test')
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['Admin']))
  async testFn() {
    return 'Доступ только для админов'
  }
}
