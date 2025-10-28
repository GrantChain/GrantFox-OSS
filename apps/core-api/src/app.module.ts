import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database';
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
import { SimpleAuthMiddleware } from './common/middleware/simple-auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SimpleAuthMiddleware)
      .exclude(
        // Rutas públicas de campaigns (GET)
        { path: 'campaigns', method: RequestMethod.GET },
        { path: 'campaigns/:id', method: RequestMethod.GET },
        { path: 'campaigns/active/with-projects', method: RequestMethod.GET },
        { path: 'campaigns/:id/projects-with-repos', method: RequestMethod.GET },
        // Rutas públicas de projects (GET)
        { path: 'projects', method: RequestMethod.GET },
        { path: 'projects/:id', method: RequestMethod.GET },
        { path: 'projects/user/:userId', method: RequestMethod.GET },
        { path: 'projects/validate-github-handle/:githubHandle', method: RequestMethod.GET },
        // Rutas públicas de repositories (GET)
        { path: 'repositories/project/:projectId', method: RequestMethod.GET },
        { path: 'repositories/:repoId', method: RequestMethod.GET },
        { path: 'repositories/:repoId/github-data', method: RequestMethod.GET },
        { path: 'repositories/:repoId/github-issues', method: RequestMethod.GET },
        { path: 'repositories/:repoId/full-details', method: RequestMethod.GET },
        // Rutas públicas de project-maintainers (GET)
        { path: 'project-maintainers/user/:userId/projects', method: RequestMethod.GET },
        { path: 'project-maintainers/project/:projectId/maintainers', method: RequestMethod.GET },
        { path: 'project-maintainers/user/:userId/stats', method: RequestMethod.GET },
        // Rutas públicas de project-reviews (GET)
        { path: 'project-reviews/project/:projectId', method: RequestMethod.GET },
        { path: 'project-reviews/project/:projectId/latest', method: RequestMethod.GET },
        { path: 'project-reviews/stats', method: RequestMethod.GET },
        // Rutas públicas de campaign-repositories (GET)
        { path: 'campaign-repositories/campaign/:campaignId/repositories', method: RequestMethod.GET },
        { path: 'campaign-repositories/repository/:repoId/campaigns', method: RequestMethod.GET },
        { path: 'campaign-repositories/repository/:repoId/active-campaign', method: RequestMethod.GET },
        { path: 'campaign-repositories/campaign/:campaignId/repositories/:repoId/check', method: RequestMethod.GET },
        // Rutas públicas de uploads (POST - permite subir sin auth)
        { path: 'uploads/avatar/:userId', method: RequestMethod.POST },
        { path: 'uploads/campaign/:campaignId', method: RequestMethod.POST },
        // Rutas públicas de escrows (GET)
        { path: 'escrows', method: RequestMethod.GET },
        { path: 'escrows/:id', method: RequestMethod.GET },
        { path: 'escrows/campaign/:campaignId', method: RequestMethod.GET },
        // Rutas públicas de campaign-contributors (GET)
        { path: 'campaign-contributors/campaign/:campaignId', method: RequestMethod.GET },
        { path: 'campaign-contributors/contributor/:contributorId', method: RequestMethod.GET },
      )
      .forRoutes(
        // Campaigns protegidos (ADMIN)
        { path: 'campaigns', method: RequestMethod.POST },
        { path: 'campaigns/:id', method: RequestMethod.PATCH },
        { path: 'campaigns/:id/status', method: RequestMethod.PATCH },
        { path: 'campaigns/:id', method: RequestMethod.DELETE },
        // Projects protegidos (MAINTAINER)
        { path: 'projects', method: RequestMethod.POST },
        { path: 'projects/:id', method: RequestMethod.PATCH },
        { path: 'projects/:id', method: RequestMethod.DELETE },
        { path: 'projects/:id/maintainers', method: RequestMethod.POST },
        { path: 'projects/:id/maintainers/:maintainerId', method: RequestMethod.DELETE },
        // Repositories protegidos (MAINTAINER)
        { path: 'repositories/project/:projectId', method: RequestMethod.POST },
        { path: 'repositories/project/:projectId/bulk', method: RequestMethod.POST },
        { path: 'repositories/:repoId', method: RequestMethod.DELETE },
        { path: 'repositories/:repoId/reactivate', method: RequestMethod.PATCH },
        // Project-maintainers protegidos (MAINTAINER)
        { path: 'project-maintainers/project/:projectId/transfer-ownership', method: RequestMethod.PATCH },
        // Project-reviews protegidos
        { path: 'project-reviews/project/:projectId', method: RequestMethod.POST }, // ADMIN
        { path: 'project-reviews/project/:projectId/resubmit', method: RequestMethod.PATCH }, // MAINTAINER
        // Campaign-repositories protegidos (MAINTAINER)
        { path: 'campaign-repositories/campaign/:campaignId/repositories', method: RequestMethod.POST },
        { path: 'campaign-repositories/campaign/:campaignId/repositories/:repoId', method: RequestMethod.DELETE },
        // Escrows protegidos (ADMIN)
        { path: 'escrows', method: RequestMethod.POST },
        { path: 'escrows/:id', method: RequestMethod.PATCH },
        // Campaign-contributors protegidos (CONTRIBUTOR)
        { path: 'campaign-contributors/campaign/:campaignId/register', method: RequestMethod.POST },
      );
  }
}
