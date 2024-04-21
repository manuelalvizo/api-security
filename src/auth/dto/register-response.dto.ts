// response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {

    @ApiProperty()
    id: string;

    @ApiProperty()
    _id: string;
  
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    roles: string[];
    
    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date

    @ApiProperty()
    __v: number
  }

