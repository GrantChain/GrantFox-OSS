import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AddRepositoryDto {
  @ApiProperty({
    description: 'GitHub repository ID',
    example: 123456789,
  })
  @IsNumber()
  github_repo_id: number;

  @ApiProperty({
    description: 'GitHub repository URL',
    example: 'https://github.com/grantfox-org/grantfox-platform',
  })
  @IsString()
  @IsNotEmpty()
  github_url: string;

  @ApiProperty({
    description: 'Repository name',
    example: 'grantfox-platform',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Repository description',
    example: 'Decentralized grant platform for open source',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
