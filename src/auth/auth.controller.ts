import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { ExceptionDto } from './dto/exception.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ 
    status: 201, 
    description: 'Datos del usuario registrado', 
    type: RegisterResponseDto,
    isArray: false 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Petición inválida', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflicto de reglas de negocio o conexión', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Recurso no encontrado', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor', 
    type: ExceptionDto 
  })
  registerUser(@Body() userObject: RegisterAuthDto) {
    return this.authService.register(userObject);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ 
    status: 200, 
    description: 'Datos del usuario logeado', 
    type: LoginResponseDto,
    isArray: false 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Petición inválida', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflicto de reglas de negocio o conexión', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Recurso no encontrado', 
    type: ExceptionDto 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor', 
    type: ExceptionDto 
  })
  loginUser(@Body() userObjectLogin:LoginAuthDto){
    return this.authService.login(userObjectLogin);
  }
}
