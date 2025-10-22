import { ApiProperty } from '@nestjs/swagger';

export class CampaignContributorResponseDto {
  @ApiProperty({
    description: 'Registration ID',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  id: string;

  @ApiProperty({
    description: 'Campaign ID',
    example: 'b1ffcc88-8c1b-3bf9-aa7c-5aa8ac270b22',
  })
  campaign_id: string;

  @ApiProperty({
    description: 'Contributor user ID',
    example: 'c2ggdd99-9d2c-4cg0-bb8d-7bb0ce491c33',
  })
  contributor_id: string;

  @ApiProperty({
    description: 'Registration timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  registered_at: Date;

  @ApiProperty({
    description: 'Campaign details',
    required: false,
  })
  campaign?: {
    campaign_id: string;
    name: string;
    status: string;
  };

  @ApiProperty({
    description: 'Contributor details',
    required: false,
  })
  contributor?: {
    user_id: string;
    username: string;
    email: string;
  };
}
