import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsEnum } from 'class-validator';
import { ProjectCategory } from '@prisma/client';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project name',
    example: 'GrantFox Platform',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'GitHub organization or user handle',
    example: 'grantfox-org',
  })
  @IsString()
  @IsNotEmpty()
  github_handle: string;

  @ApiProperty({
    description: 'Short description (max 200 chars)',
    example: 'Decentralized grant platform for open source',
  })
  @IsString()
  @IsNotEmpty()
  short_description: string;

  @ApiProperty({
    description: 'Full project description',
    example: 'GrantFox is a platform that connects maintainers with contributors...',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Technology stack',
    example: ['TypeScript', 'NestJS', 'Prisma', 'Stellar'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  tech_stack: string[];

  @ApiProperty({
    description: 'Project category',
    enum: ProjectCategory,
    example: 'DEFI',
  })
  @IsEnum(ProjectCategory)
  category: ProjectCategory;
}
