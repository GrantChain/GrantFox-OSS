import { ApiProperty } from '@nestjs/swagger';
import { CampaignStatus } from '@prisma/client';

class RepositoryDto {
  @ApiProperty()
  github_repo_id: number;

  @ApiProperty()
  github_url: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;
}

export class CampaignResponseDto {
  @ApiProperty()
  campaign_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [String] })
  tags: string[];

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;

  @ApiProperty({ enum: CampaignStatus })
  status: CampaignStatus;

  @ApiProperty({ required: false })
  image_url?: string;

  @ApiProperty()
  created_by: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ type: [RepositoryDto], required: false })
  repositories?: RepositoryDto[];
}
