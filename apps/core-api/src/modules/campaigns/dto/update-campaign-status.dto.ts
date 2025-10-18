import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { CampaignStatus } from '@prisma/client';

export class UpdateCampaignStatusDto {
  @ApiProperty({
    description: 'New campaign status',
    enum: CampaignStatus,
    example: CampaignStatus.ACTIVE,
  })
  @IsEnum(CampaignStatus)
  status: CampaignStatus;
}
