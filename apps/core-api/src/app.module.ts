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

/**
 * AppModule - Módulo raíz de la aplicación
 * 
 * CAMBIO IMPORTANTE:
 * - Ya NO usamos middleware para autenticación
 * - Ahora usamos Guards en cada controlador: @UseGuards(SupabaseAuthGuard, RolesGuard)
 * - AuthModule proporciona la estrategia Passport para verificar JWTs
 * 
 * VENTAJAS:
 * - Más declarativo (se ve en cada endpoint qué guards usa)
 * - Mejor para testing (puedes mockear guards fácilmente)
 * - Approach estándar de NestJS con Passport
 * - Los endpoints públicos simplemente NO usan @UseGuards
 */
@Module({
  imports: [
    // ConfigModule: Variables de entorno (.env)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // DatabaseModule: Prisma + PostgreSQL
    DatabaseModule,
    
    // AuthModule: Passport Strategy para JWT de Supabase
    AuthModule,
    
    // Feature Modules
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
export class AppModule {}
