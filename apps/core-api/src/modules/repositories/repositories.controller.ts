import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RepositoriesService } from './repositories.service';
import { CampaignsExtendedService } from '../campaigns/campaigns-extended.service';
import { AddRepositoryDto } from './dto/add-repository.dto';
import { AddMultipleRepositoriesDto } from './dto/add-multiple-repositories.dto';
import { RepositoryResponseDto } from './dto/repository-response.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Public } from '../../common/decorators';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';
import { SupabaseAuthGuard } from '../../auth/supabase-auth.guard';

@ApiTags('repositories')
@Controller('repositories')
@UseGuards(SupabaseAuthGuard, RolesGuard)
@ApiBearerAuth()
export class RepositoriesController {
  constructor(
    private readonly repositoriesService: RepositoriesService,
    private readonly campaignsExtendedService: CampaignsExtendedService,
  ) {}

  @Post('project/:projectId')
  @Roles(UserRole.MAINTAINER)
  @ApiOperation({
    summary: 'Add repository to project (MAINTAINER owner only)',
    description:
      'Adds a GitHub repository to a project. If repository was previously deactivated, it will be reactivated.',
  })
  @ApiParam({ name: 'projectId', type: String, description: 'Project UUID' })
  @ApiResponse({
    status: 201,
    description: 'Repository added successfully',
    type: RepositoryResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Must be project owner' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 409, description: 'Repository already registered' })
  addToProject(
    @Param('projectId') projectId: string,
    @Body() dto: AddRepositoryDto,
    @CurrentUser() user: any,
  ) {
    return this.repositoriesService.addToProject(projectId, dto, user.user_id);
  }

  @Post('project/:projectId/bulk')
  @Roles(UserRole.MAINTAINER)
  @ApiOperation({
    summary: 'Add multiple repositories to project (MAINTAINER owner only)',
    description:
      'Adds multiple GitHub repositories to a project at once. Returns summary of created, reactivated, and errors.',
  })
  @ApiParam({ name: 'projectId', type: String, description: 'Project UUID' })
  @ApiResponse({
    status: 201,
    description: 'Repositories processed successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Must be project owner' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  addMultipleToProject(
    @Param('projectId') projectId: string,
    @Body() dto: AddMultipleRepositoriesDto,
    @CurrentUser() user: any,
  ) {
    return this.repositoriesService.addMultipleToProject(projectId, dto, user.user_id);
  }

  @Public()  
  @Get('project/:projectId')
  @ApiOperation({
    summary: 'Get repositories by project',
    description: 'Returns all repositories for a project, optionally including inactive ones.',
  })
  @ApiParam({ name: 'projectId', type: String, description: 'Project UUID' })
  @ApiQuery({
    name: 'includeInactive',
    type: Boolean,
    required: false,
    description: 'Include inactive repositories',
  })
  @ApiResponse({
    status: 200,
    description: 'List of repositories',
    type: [RepositoryResponseDto],
  })
  findByProject(
    @Param('projectId') projectId: string,
    @Query('includeInactive', new ParseBoolPipe({ optional: true }))
    includeInactive?: boolean,
  ) {
    return this.repositoriesService.findByProject(projectId, includeInactive);
  }

  @Public()  
  @Get(':repoId')
  @ApiOperation({
    summary: 'Get a repository by ID',
    description: 'Returns detailed information about a repository',
  })
  @ApiParam({
    name: 'repoId',
    type: Number,
    description: 'GitHub Repository ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Repository details',
    type: RepositoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Repository not found' })
  findOne(@Param('repoId', ParseIntPipe) repoId: number) {
    return this.repositoriesService.findOne(repoId);
  }

  @Delete(':repoId')
  @Roles(UserRole.MAINTAINER)
  @ApiOperation({
    summary: 'Deactivate a repository (MAINTAINER owner only)',
    description:
      'Soft deletes a repository by setting is_active to false. Use this when repo is deleted from GitHub.',
  })
  @ApiParam({
    name: 'repoId',
    type: Number,
    description: 'GitHub Repository ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Repository deactivated',
    type: RepositoryResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Must be project owner' })
  @ApiResponse({ status: 404, description: 'Repository not found' })
  @HttpCode(HttpStatus.OK)
  deactivate(
    @Param('repoId', ParseIntPipe) repoId: number,
    @CurrentUser() user: any,
  ) {
    return this.repositoriesService.deactivate(repoId, user.user_id);
  }

  @Patch(':repoId/reactivate')
  @Roles(UserRole.MAINTAINER)
  @ApiOperation({
    summary: 'Reactivate a repository (MAINTAINER owner only)',
    description: 'Reactivates a previously deactivated repository.',
  })
  @ApiParam({
    name: 'repoId',
    type: Number,
    description: 'GitHub Repository ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Repository reactivated',
    type: RepositoryResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Must be project owner' })
  @ApiResponse({ status: 404, description: 'Repository not found' })
  @HttpCode(HttpStatus.OK)
  reactivateRepository(
    @Param('repoId', ParseIntPipe) repoId: number,
    @CurrentUser() user: any,
  ) {
    return this.repositoriesService.reactivate(repoId, user.user_id);
  }

  @Public()  
  @Get(':repoId/github-data')
  @ApiOperation({
    summary: 'Get GitHub metadata for a repository',
    description:
      'Returns GitHub metadata (stars, forks, issues, language, topics) for a repository.',
  })
  @ApiParam({
    name: 'repoId',
    type: Number,
    description: 'GitHub Repository ID',
  })
  @ApiResponse({
    status: 200,
    description: 'GitHub metadata',
  })
  @ApiResponse({ status: 404, description: 'Repository not found' })
  getRepositoryGitHubData(@Param('repoId', ParseIntPipe) repoId: number) {
    return this.campaignsExtendedService.getRepositoryGitHubData(repoId);
  }

  @Public()  
  @Get(':repoId/github-issues')
  @ApiOperation({
    summary: 'Get GitHub issues for a repository',
    description:
      'Returns open issues from GitHub for a repository. Useful for contributor landing page.',
  })
  @ApiParam({
    name: 'repoId',
    type: Number,
    description: 'GitHub Repository ID',
  })
  @ApiResponse({
    status: 200,
    description: 'List of GitHub issues',
  })
  @ApiResponse({ status: 404, description: 'Repository not found' })
  getRepositoryGitHubIssues(@Param('repoId', ParseIntPipe) repoId: number) {
    return this.campaignsExtendedService.getRepositoryGitHubIssues(repoId);
  }

  @Public()  
  @Get(':repoId/full-details')
  @ApiOperation({
    summary: 'Get complete repository details (ALL IN ONE)',
    description:
      'Returns repository info + GitHub metadata + GitHub issues in a single request. Ideal for repository details page.',
  })
  @ApiParam({
    name: 'repoId',
    type: Number,
    description: 'GitHub Repository ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Complete repository details',
  })
  @ApiResponse({ status: 404, description: 'Repository not found' })
  getRepositoryFullDetails(@Param('repoId', ParseIntPipe) repoId: number) {
    return this.campaignsExtendedService.getRepositoryFullDetails(repoId);
  }
}

