import { Module } from '@nestjs/common';
import { ProjectReviewsService } from './project-reviews.service';
import { ProjectReviewsController } from './project-reviews.controller';
import { DatabaseModule } from '../../database';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectReviewsController],
  providers: [ProjectReviewsService],
  exports: [ProjectReviewsService],
})
export class ProjectReviewsModule {}
