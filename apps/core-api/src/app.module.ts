import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database';
import { UsersModule } from './modules/users/users.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { RepositoriesModule } from './modules/repositories/repositories.module';
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
        // Rutas públicas de projects (GET)
        { path: 'projects', method: RequestMethod.GET },
        { path: 'projects/:id', method: RequestMethod.GET },
        { path: 'projects/user/:userId', method: RequestMethod.GET },
        // Rutas públicas de repositories (GET)
        { path: 'repositories/project/:projectId', method: RequestMethod.GET },
        { path: 'repositories/:repoId', method: RequestMethod.GET },
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
        { path: 'projects/:id/status', method: RequestMethod.PATCH },
        { path: 'projects/:id', method: RequestMethod.DELETE },
        { path: 'projects/:id/maintainers', method: RequestMethod.POST },
        { path: 'projects/:id/maintainers/:maintainerId', method: RequestMethod.DELETE },
        // Repositories protegidos (MAINTAINER)
        { path: 'repositories/project/:projectId', method: RequestMethod.POST },
        { path: 'repositories/:repoId', method: RequestMethod.DELETE },
        { path: 'repositories/:repoId/reactivate', method: RequestMethod.PATCH },
      );
  }
}
