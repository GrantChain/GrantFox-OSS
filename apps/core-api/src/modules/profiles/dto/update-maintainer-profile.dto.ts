import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMaintainerProfileDto {
  @ApiPropertyOptional({
    description: 'Maintainer bio',
    example: 'Open source enthusiast with 5+ years of experience',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    description: 'Social media links (JSON object)',
    example: {
      github: 'https://github.com/username',
      twitter: 'https://twitter.com/username',
    },
  })
  @IsOptional()
  social_media?: Record<string, any>;
}
