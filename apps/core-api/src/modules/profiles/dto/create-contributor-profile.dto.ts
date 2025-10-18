import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateContributorProfileDto {
  @ApiProperty({
    description: 'User ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    description: 'Array of skills',
    example: ['TypeScript', 'React', 'Node.js', 'Solidity'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiProperty({
    description: 'Contributor bio',
    example: 'Full-stack developer passionate about Web3',
    required: false,
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    description: 'Portfolio URL',
    example: 'https://myportfolio.com',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  portfolio_url?: string;

  @ApiProperty({
    description: 'Social media links (JSON object)',
    example: {
      github: 'https://github.com/username',
      twitter: 'https://twitter.com/username',
    },
    required: false,
  })
  @IsOptional()
  social_media?: Record<string, any>;
}
