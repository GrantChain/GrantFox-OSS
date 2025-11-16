import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProjectReviewsService } from './project-reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Public } from '../../common/decorators';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';
import { SupabaseAuthGuard } from '../../auth/supabase-auth.guard';

@ApiTags('project-reviews')
@Controller('project-reviews')
@UseGuards(SupabaseAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ProjectReviewsController {
  constructor(
    private readonly projectReviewsService: ProjectReviewsService,
  ) {}

  @Post('project/:projectId')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create a review for a project (ADMIN only)',
    description:
      'Admin reviews a project and changes its status based on the action (APPROVED, REJECTED, CHANGES_REQUESTED).',
  })
  @ApiParam({ name: 'projectId', type: String, description: 'Project UUID' })
  @ApiResponse({
    status: 201,
    description: 'Review created successfully',
    type: ReviewResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Project must be in PENDING status',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - ADMIN role required' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  createReview(
    @Param('projectId') projectId: string,
    @Body() dto: CreateReviewDto,
    @CurrentUser() user: any,
  ) {
    return this.projectReviewsService.createReview(
      projectId,
      dto,
      user.user_id,
    );
  }

  @Public()  
  @Get('project/:projectId')
  @ApiOperation({
    summary: 'Get all reviews for a project',
    description:
      'Returns the complete review history for a project, ordered by most recent first.',
  })
  @ApiParam({ name: 'projectId', type: String, description: 'Project UUID' })
  @ApiResponse({
    status: 200,
    description: 'List of reviews',
    type: [ReviewResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  getReviewsByProject(@Param('projectId') projectId: string) {
    return this.projectReviewsService.getReviewsByProject(projectId);
  }

  @Public()  
  @Get('project/:projectId/latest')
  @ApiOperation({
    summary: 'Get the latest review for a project',
    description:
      'Returns the most recent review for a project. Useful for showing rejection feedback.',
  })
  @ApiParam({ name: 'projectId', type: String, description: 'Project UUID' })
  @ApiResponse({
    status: 200,
    description: 'Latest review',
    type: ReviewResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Project or review not found' })
  getLatestReview(@Param('projectId') projectId: string) {
    return this.projectReviewsService.getLatestReview(projectId);
  }

  @Patch('project/:projectId/resubmit')
  @Roles(UserRole.MAINTAINER)
  @ApiOperation({
    summary: 'Resubmit a rejected project (MAINTAINER owner only)',
    description:
      'Changes project status from REJECTED to PENDING for a new review. Only project owners can resubmit.',
  })
  @ApiParam({ name: 'projectId', type: String, description: 'Project UUID' })
  @ApiResponse({
    status: 200,
    description: 'Project resubmitted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Only REJECTED projects can be resubmitted',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Must be project owner' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @HttpCode(HttpStatus.OK)
  resubmitProject(
    @Param('projectId') projectId: string,
    @CurrentUser() user: any,
  ) {
    return this.projectReviewsService.resubmitProject(projectId, user.user_id);
  }

  @Public()  
  @Get('stats')
  @ApiOperation({
    summary: 'Get review statistics',
    description:
      'Returns general statistics about project reviews (total, approved, rejected, pending).',
  })
  @ApiResponse({
    status: 200,
    description: 'Review statistics',
  })
  getReviewStats() {
    return this.projectReviewsService.getReviewStats();
  }
}
