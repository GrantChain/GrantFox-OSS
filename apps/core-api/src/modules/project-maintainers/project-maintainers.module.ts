import { Module } from '@nestjs/common';
import { ProjectMaintainersService } from './project-maintainers.service';
import { ProjectMaintainersController } from './project-maintainers.controller';
import { DatabaseModule } from '../../database';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectMaintainersController],
  providers: [ProjectMaintainersService],
  exports: [ProjectMaintainersService],
})
export class ProjectMaintainersModule {}
