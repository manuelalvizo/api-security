import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query
} from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { QueryDto } from './dto/query.dto';
import { ExceptionDto } from 'src/auth/dto/exception.dto';
import { HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersResponseDto, UserResponseDto } from './dto/user-response-dto'

@ApiBearerAuth()
@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ 
    status: 200, 
    description: 'Datos de los usuario solicitado', 
    type: UsersResponseDto,
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
  findAll(@Query() queryDto: QueryDto) {
    const { page, limit } = queryDto; // Obtén la página y el límite de la consulta
    return this.usersService.findAll(page, limit);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ 
    status: 200, 
    description: 'Datos del usuario solicitado', 
    type: UserResponseDto,
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
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ 
    status: 200, 
    description: 'Datos del usuario actualizado', 
    type: UserResponseDto,
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ 
    status: 204, 
    description: 'Indica que el usuario se elimino correctamente', 
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
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}