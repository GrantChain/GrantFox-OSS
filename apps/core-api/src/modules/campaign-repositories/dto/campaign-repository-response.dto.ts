import { ApiProperty } from '@nestjs/swagger';

export class CampaignRepositoryResponseDto {
  @ApiProperty()
  campaign_id: string;

  @ApiProperty()
  repository_id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ required: false })
  campaign?: {
    campaign_id: string;
    name: string;
    status: string;
    start_date: Date;
    end_date: Date;
  };

  @ApiProperty({ required: false })
  repository?: {
    github_repo_id: number;
    name: string;
    github_url: string;
    project_id: string;
  };
}
