import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { LoginUserDto } from './DTO/login-user.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Post('login')
  async login(@Body() data: LoginUserDto) {
    return this.userService.login(data);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
}
