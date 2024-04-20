import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  
    @ApiProperty({ description: 'Email de la cuenta', example: "correo@correo.com" })
    @IsEmail()
    email: string;
  
    @ApiProperty({ description: 'Contraseña de la cuenta', minLength: 6, maxLength: 20})
    @MinLength(6)
    @MaxLength(20)
    password: string;
  }