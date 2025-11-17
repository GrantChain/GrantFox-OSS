import { ApiProperty } from '@nestjs/swagger';

export class PullRequestInfoDto {
  @ApiProperty({ example: 123 })
  pr_number: number;

  @ApiProperty({ example: 'https://github.com/org/repo/pull/123' })
  pr_url: string;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  merged_at: string;

  @ApiProperty({ example: 'johndoe' })
  author_github_username: string;
}

export class ContributorInfoDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  user_id: string;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: true })
  has_contributor_role: boolean;

  @ApiProperty({
    example: 'GABC123...',
    required: false,
    nullable: true,
  })
  primary_wallet?: string;
}

export class RepositoryInfoDto {
  @ApiProperty({ example: 'my-awesome-repo' })
  name: string;

  @ApiProperty({ example: 'https://github.com/org/my-awesome-repo' })
  github_url: string;
}

export class IssueResultDto {
  @ApiProperty({ example: 1234567890 })
  issue_id: number;

  @ApiProperty({ example: 42 })
  issue_number: number;

  @ApiProperty({ example: 'Fix bug in authentication' })
  title: string;

  @ApiProperty({ example: 'https://github.com/org/repo/issues/42' })
  html_url: string;

  @ApiProperty({ example: ['bug', 'high-priority', 'Campaign-Q1-2024'] })
  labels: string[];

  @ApiProperty({ type: RepositoryInfoDto })
  repository: RepositoryInfoDto;

  @ApiProperty({ type: PullRequestInfoDto })
  pull_request: PullRequestInfoDto;

  @ApiProperty({ example: true })
  contributor_exists: boolean;

  @ApiProperty({
    type: ContributorInfoDto,
    required: false,
    nullable: true,
  })
  contributor_info?: ContributorInfoDto;
}

export class CampaignResultsResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  campaign_id: string;

  @ApiProperty({ example: 'Q1 2024 Campaign' })
  campaign_name: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  project_id: string;

  @ApiProperty({ example: 'Awesome DeFi Project' })
  project_name: string;

  @ApiProperty({ example: 15 })
  total_issues: number;

  @ApiProperty({ example: 12 })
  total_eligible_contributors: number;

  @ApiProperty({ type: [IssueResultDto] })
  issues: IssueResultDto[];
}

