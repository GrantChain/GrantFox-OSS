import { Module } from '@nestjs/common';
import { CampaignRepositoriesService } from './campaign-repositories.service';
import { CampaignRepositoriesController } from './campaign-repositories.controller';
import { DatabaseModule } from '../../database';

@Module({
  imports: [DatabaseModule],
  controllers: [CampaignRepositoriesController],
  providers: [CampaignRepositoriesService],
  exports: [CampaignRepositoriesService],
})
export class CampaignRepositoriesModule {}
