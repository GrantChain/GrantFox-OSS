import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ProjectStatus } from '@prisma/client';

export class UpdateProjectStatusDto {
  @ApiProperty({
    description: 'Project status',
    enum: ProjectStatus,
    example: 'ACTIVE',
  })
  @IsEnum(ProjectStatus)
  status: ProjectStatus;
}
