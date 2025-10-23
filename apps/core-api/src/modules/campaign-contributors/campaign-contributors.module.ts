import { Module } from '@nestjs/common';
import { CampaignContributorsService } from './campaign-contributors.service';
import { CampaignContributorsController } from './campaign-contributors.controller';
import { DatabaseModule } from '../../database';

@Module({
  imports: [DatabaseModule],
  controllers: [CampaignContributorsController],
  providers: [CampaignContributorsService],
  exports: [CampaignContributorsService],
})
export class CampaignContributorsModule {}
