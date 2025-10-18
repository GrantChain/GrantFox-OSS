import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayMinSize } from 'class-validator';

export class AddRepositoriesDto {
  @ApiProperty({
    description: 'Array of repository IDs to add to the campaign',
    example: [123456789, 987654321],
    type: [Number],
  })
  @IsArray()
  @ArrayMinSize(1)
  repository_ids: number[];
}
