import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('login')
  async setAuth(@Body() email:{ email: string }) {
    return this.authenticationService.setAuth(email.email)
  }
}
