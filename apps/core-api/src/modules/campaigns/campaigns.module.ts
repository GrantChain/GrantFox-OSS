import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsExtendedService } from './campaigns-extended.service';
import { CampaignsController } from './campaigns.controller';
import { DatabaseModule } from '../../database';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [DatabaseModule, UploadsModule],
  controllers: [CampaignsController],
  providers: [CampaignsService, CampaignsExtendedService],
  exports: [CampaignsService, CampaignsExtendedService],
})
export class CampaignsModule {}
