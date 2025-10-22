import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { AddRepositoryDto } from './add-repository.dto';

export class AddMultipleRepositoriesDto {
  @ApiProperty({
    description: 'Array of repositories to add',
    type: [AddRepositoryDto],
    example: [
      {
        github_repo_id: 123456789,
        github_url: 'https://github.com/grantfox-org/core-api',
        name: 'core-api',
        description: 'Backend API',
      },
      {
        github_repo_id: 987654321,
        github_url: 'https://github.com/grantfox-org/frontend',
        name: 'frontend',
        description: 'Frontend app',
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AddRepositoryDto)
  repositories: AddRepositoryDto[];
}
