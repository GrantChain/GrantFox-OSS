import { ApiProperty } from '@nestjs/swagger';
import { ReviewAction } from '@prisma/client';

export class ReviewResponseDto {
  @ApiProperty()
  review_id: string;

  @ApiProperty()
  project_id: string;

  @ApiProperty()
  admin_id: string;

  @ApiProperty({ enum: ReviewAction })
  action: ReviewAction;

  @ApiProperty({ required: false })
  reason?: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ required: false })
  admin?: {
    user_id: string;
    email: string;
    username: string;
  };

  @ApiProperty({ required: false })
  project?: {
    project_id: string;
    name: string;
    status: string;
  };
}
