import { RegisterUserDto } from './dtos/register-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() dto: LoginUserDto) {
    return this.authService.signIn(dto);
  }

  @Post('sign-up')
  async signUp(@Body() dto: RegisterUserDto) {
    return this.authService.signUp(dto);
  }
}
