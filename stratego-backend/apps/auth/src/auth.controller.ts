/* Authentication module controller */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRequest } from './dto/create-user.request';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  async createUser(@Body() request: UserRequest) {
    return this.authService.createUser(request);
  }

  @Post('auth/login')
  async login(@Body() request: UserRequest) {
    return this.authService.login(request);
  }
}
