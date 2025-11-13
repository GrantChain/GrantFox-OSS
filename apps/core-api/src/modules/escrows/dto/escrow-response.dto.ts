import { ApiProperty } from '@nestjs/swagger';
import { EscrowType } from '@prisma/client';

export class EscrowResponseDto {
  @ApiProperty({
    description: 'Escrow ID from Stellar blockchain',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  escrow_id: string;

  @ApiProperty({
    description: 'Type of escrow',
    enum: EscrowType,
    example: EscrowType.MAINTAINER,
  })
  escrow_type: EscrowType;

  @ApiProperty({
    description: 'Campaign ID',
    example: 'b1ffcc88-8c1b-3bf9-aa7c-5aa8ac270b22',
  })
  campaign_id: string;

  @ApiProperty({
    description: 'Project ID',
    example: 'c2ggdd99-9d2c-4cg0-bb8d-7bb0ce491c33',
  })
  project_id: string;

  @ApiProperty({
    description: 'User ID who created the escrow',
    example: 'd3hhee00-0e3d-5dh1-cc9e-8cc1df502d44',
  })
  created_by: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Campaign details',
    required: false,
  })
  campaign?: {
    campaign_id: string;
    name: string;
    description: string;
    status: string;
    repositories?: any[];
  };

  @ApiProperty({
    description: 'Project details',
    required: false,
  })
  project?: {
    project_id: string;
    name: string;
    github_handle: string;
    short_description: string;
    status: string;
  };
}
