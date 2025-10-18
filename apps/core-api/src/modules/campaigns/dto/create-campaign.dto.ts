import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDateString,
  IsOptional,
  IsUrl,
  ArrayMinSize,
} from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({
    description: 'Campaign name',
    example: 'Hacktoberfest 2024',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Campaign description',
    example: 'Annual open source contribution campaign',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Campaign tags for categorization',
    example: ['opensource', 'hacktoberfest', 'blockchain'],
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({
    description: 'Campaign start date',
    example: '2024-10-01T00:00:00Z',
  })
  @IsDateString()
  start_date: string;

  @ApiProperty({
    description: 'Campaign end date',
    example: '2024-10-31T23:59:59Z',
  })
  @IsDateString()
  end_date: string;

  @ApiProperty({
    description: 'Campaign image URL',
    example: 'https://example.com/campaign-image.png',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  image_url?: string;
}
