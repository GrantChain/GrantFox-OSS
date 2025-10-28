import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ValidateGithubHandleDto {
  @ApiProperty({
    description: 'GitHub organization or user handle to validate',
    example: 'grantfox-org',
  })
  @IsString()
  @IsNotEmpty()
  github_handle: string;
}
