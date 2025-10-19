import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayMinSize, IsNumber } from 'class-validator';

export class AddRepositoriesToCampaignDto {
  @ApiProperty({
    description: 'Array of GitHub repository IDs to add to the campaign',
    example: [123456789, 987654321],
    type: [Number],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  repository_ids: number[];
}
