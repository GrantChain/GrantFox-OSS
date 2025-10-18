import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMaintainerProfileDto {
  @ApiProperty({
    description: 'User ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    description: 'Maintainer bio',
    example: 'Open source enthusiast with 5+ years of experience',
    required: false,
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    description: 'Social media links (JSON object)',
    example: {
      github: 'https://github.com/username',
      twitter: 'https://twitter.com/username',
      linkedin: 'https://linkedin.com/in/username',
    },
    required: false,
  })
  @IsOptional()
  social_media?: Record<string, any>;
}
