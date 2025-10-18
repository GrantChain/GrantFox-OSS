import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateContributorProfileDto {
  @ApiPropertyOptional({
    description: 'Array of skills',
    example: ['TypeScript', 'React', 'Node.js'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiPropertyOptional({
    description: 'Contributor bio',
    example: 'Full-stack developer passionate about Web3',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    description: 'Portfolio URL',
    example: 'https://myportfolio.com',
  })
  @IsOptional()
  @IsUrl()
  portfolio_url?: string;

  @ApiPropertyOptional({
    description: 'Social media links (JSON object)',
    example: {
      github: 'https://github.com/username',
    },
  })
  @IsOptional()
  social_media?: Record<string, any>;
}
