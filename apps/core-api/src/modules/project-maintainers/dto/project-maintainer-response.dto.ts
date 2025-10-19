import { ApiProperty } from '@nestjs/swagger';

export class ProjectMaintainerResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  project_id: string;

  @ApiProperty()
  maintainer_id: string;

  @ApiProperty()
  is_owner: boolean;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ required: false })
  maintainer?: {
    user_id: string;
    email: string;
    username: string;
    avatar_url?: string;
  };

  @ApiProperty({ required: false })
  project?: {
    project_id: string;
    name: string;
    github_handle: string;
    status: string;
  };
}
