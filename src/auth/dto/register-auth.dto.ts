import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto {

  @ApiProperty({ description: 'Nombre de la cuenta' })
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @ApiProperty({ description: 'Email de la cuenta', example: "correo@correo.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña de la cuenta'})
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @ApiProperty({ description: 'Roles de acceso del usuario'})
  @IsArray()
  roles: string[];

}