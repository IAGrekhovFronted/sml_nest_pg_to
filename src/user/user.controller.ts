import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() data:Partial<User>) {
    console.log("Запрос")
    return await this.userService.createUser(data)
  }
}
