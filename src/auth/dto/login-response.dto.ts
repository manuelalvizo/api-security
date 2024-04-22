// response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class UserDto {

    @ApiProperty()
    id: string;
  
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;
  
    @ApiProperty()
    roles: string[];
  }
  

export class LoginResponseDto {

    @ApiProperty({ type: [UserDto] })
    user: UserDto;

    @ApiProperty()
    token: string;
}

