import { ApiProperty } from '@nestjs/swagger';
import { ProjectCategory, ProjectStatus } from '@prisma/client';

export class ProjectResponseDto {
  @ApiProperty()
  project_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  github_handle: string;

  @ApiProperty({ required: false })
  organization_avatar_url?: string;

  @ApiProperty()
  short_description: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [String] })
  tech_stack: string[];

  @ApiProperty({ enum: ProjectCategory })
  category: ProjectCategory;

  @ApiProperty({ enum: ProjectStatus })
  status: ProjectStatus;

  @ApiProperty()
  created_by: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ required: false })
  reviewed_at?: Date;

  @ApiProperty({ required: false })
  maintainers?: any[];

  @ApiProperty({ required: false })
  repositories?: any[];
}
