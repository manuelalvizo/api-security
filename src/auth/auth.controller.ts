import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() userObject: RegisterAuthDto) {
    console.log({body: userObject})
    return this.authService.register(userObject);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  loginUser(@Body() userObjectLogin:LoginAuthDto){
    return this.authService.login(userObjectLogin);
  }
}
