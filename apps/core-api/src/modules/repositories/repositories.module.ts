import { Module } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { RepositoriesController } from './repositories.controller';
import { DatabaseModule } from '../../database';
import { CampaignsModule } from '../campaigns/campaigns.module';

@Module({
  imports: [DatabaseModule, CampaignsModule],
  controllers: [RepositoriesController],
  providers: [RepositoriesService],
  exports: [RepositoriesService],
})
export class RepositoriesModule {}
