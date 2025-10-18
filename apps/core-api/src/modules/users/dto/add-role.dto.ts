import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '@prisma/client';

export class AddRoleDto {
  @ApiProperty({
    description: 'Role to add to the user',
    enum: UserRole,
    example: UserRole.MAINTAINER,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
