import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database';
import { AuthModule } from './auth';
import { UsersModule } from './modules/users/users.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { RepositoriesModule } from './modules/repositories/repositories.module';
import { ProjectMaintainersModule } from './modules/project-maintainers/project-maintainers.module';
import { ProjectReviewsModule } from './modules/project-reviews/project-reviews.module';
import { CampaignRepositoriesModule } from './modules/campaign-repositories/campaign-repositories.module';
import { CampaignContributorsModule } from './modules/campaign-contributors/campaign-contributors.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { EscrowsModule } from './modules/escrows/escrows.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ProfilesModule,
    CampaignsModule,
    WalletsModule,
    ProjectsModule,
    RepositoriesModule,
    ProjectMaintainersModule,
    ProjectReviewsModule,
    CampaignRepositoriesModule,
    CampaignContributorsModule,
    UploadsModule,
    EscrowsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
