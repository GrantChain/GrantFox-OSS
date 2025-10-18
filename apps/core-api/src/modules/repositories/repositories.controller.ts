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
} from '@nestjs/swagger';
import { RepositoriesService } from './repositories.service';
import { AddRepositoryDto } from './dto/add-repository.dto';
import { RepositoryResponseDto } from './dto/repository-response.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('repositories')
@Controller('repositories')
@UseGuards(RolesGuard)
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

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
  reactivate(
    @Param('repoId', ParseIntPipe) repoId: number,
    @CurrentUser() user: any,
  ) {
    return this.repositoriesService.reactivate(repoId, user.user_id);
  }
}
