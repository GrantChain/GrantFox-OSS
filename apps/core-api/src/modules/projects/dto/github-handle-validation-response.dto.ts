import { ApiProperty } from '@nestjs/swagger';

export class GithubHandleValidationResponseDto {
  @ApiProperty({
    description: 'Whether the github_handle exists in the database',
    example: true,
  })
  exists: boolean;

  @ApiProperty({
    description: 'The github_handle that was validated',
    example: 'grantfox-org',
  })
  github_handle: string;

  @ApiProperty({
    description: 'Project information if exists',
    required: false,
    example: {
      project_id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'GrantFox Platform',
      status: 'APPROVED',
    },
  })
  project?: {
    project_id: string;
    name: string;
    status: string;
  };
}
