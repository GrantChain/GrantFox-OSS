import { ApiProperty } from '@nestjs/swagger';

export class MaintainerStatsDto {
  @ApiProperty({
    description: 'Total number of projects',
    example: 5,
  })
  total_projects: number;

  @ApiProperty({
    description: 'Number of projects where user is owner',
    example: 2,
  })
  owned_projects: number;

  @ApiProperty({
    description: 'Number of active projects',
    example: 4,
  })
  active_projects: number;

  @ApiProperty({
    description: 'Number of pending projects',
    example: 1,
  })
  pending_projects: number;

  @ApiProperty({
    description: 'Number of approved projects',
    example: 3,
  })
  approved_projects: number;
}
