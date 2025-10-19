import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ReviewAction } from '@prisma/client';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Review action',
    enum: ReviewAction,
    example: 'APPROVED',
  })
  @IsEnum(ReviewAction)
  @IsNotEmpty()
  action: ReviewAction;

  @ApiProperty({
    description: 'Feedback or reason for the decision',
    example: 'Great project! Approved for the platform.',
    required: false,
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
