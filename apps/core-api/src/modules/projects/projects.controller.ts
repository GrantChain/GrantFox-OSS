import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { AddMaintainerDto } from './dto/add-maintainer.dto';
import { GithubHandleValidationResponseDto } from './dto/github-handle-validation-response.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Public } from '../../common/decorators';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, ProjectStatus } from '@prisma/client';
import { SupabaseAuthGuard } from '../../auth/supabase-auth.guard';

@ApiTags('projects')
@Controller('projects')
@UseGuards(SupabaseAuthGuard, RolesGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles(UserRole.MAINTAINER)
  @ApiOperation({
    summary: 'Create a new project (MAINTAINER only)',
    description:
      'Creates a new project with status PENDING. The creator is automatically added as owner.',
  })
  @ApiResponse({
    status: 201,
    description: 'Project created successfully',
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden - MAINTAINER role required' })
  create(@Body() dto: CreateProjectDto, @CurrentUser() user: any) {
    return this.projectsService.create(dto, user.user_id);
  }

  @Public()  
  @Get()
  @ApiOperation({
    summary: 'Get all projects',
    description: 'Returns all projects, optionally filtered by status',
  })
  @ApiQuery({
    name: 'status',
    enum: ProjectStatus,
    required: false,
    description: 'Filter by project status',
  })
  @ApiResponse({
    status: 200,
    description: 'List of projects',
    type: [ProjectResponseDto],
  })
  findAll(@Query('status') status?: ProjectStatus) {
    return this.projectsService.findAll(status);
  }

  @Public()  
  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get projects by user',
    description: 'Returns all projects where the user is an active maintainer',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 200,
    description: 'List of user projects',
    type: [ProjectResponseDto],
  })
  findByUser(@Param('userId') userId: string) {
    return this.projectsService.findByUser(userId);
  }

  @Public()  
  @Get('validate-github-handle/:githubHandle')
  @ApiOperation({
    summary: 'Validate if a project with this GitHub handle exists',
    description:
      'Checks if a project with the given GitHub handle already exists in the database. Returns the project info if found.',
  })
  @ApiParam({
    name: 'githubHandle',
    type: String,
    description: 'GitHub handle to validate',
  })
  @ApiResponse({
    status: 200,
    description: 'Validation result',
    type: GithubHandleValidationResponseDto,
  })
  validateGithubHandle(@Param('githubHandle') githubHandle: string) {
    return this.projectsService.validateGithubHandle({ github_handle: githubHandle });
  }

  @Public()  
  @Get(':id')
  @ApiOperation({
    summary: 'Get a project by ID',
    description: 'Returns detailed information about a project',
  })
  @ApiParam({ name: 'id', type: String, description: 'Project UUID' })
  @ApiResponse({
    status: 200,
    description: 'Project details',
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.MAINTAINER)
  @ApiOperation({
    summary: 'Update a project (MAINTAINER owner only)',
    description: 'Updates project information. Only project owners can update.',
  })
  @ApiParam({ name: 'id', type: String, description: 'Project UUID' })
  @ApiResponse({
    status: 200,
    description: 'Project updated successfully',
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Must be project owner' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
    @CurrentUser() user: any,
  ) {
    return this.projectsService.update(id, dto, user.user_id);
  }

  @Delete(':id')
  @Roles(UserRole.MAINTAINER)
  @ApiOperation({
    summary: 'Delete a project (MAINTAINER owner only)',
    description:
      'Soft deletes a project by setting its status to INACTIVE. Only project owners can delete.',
  })
  @ApiParam({ name: 'id', type: String, description: 'Project UUID' })
  @ApiResponse({
    status: 200,
    description: 'Project status changed to INACTIVE',
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Must be project owner' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.projectsService.remove(id, user.user_id);
  }

  @Post(':id/maintainers')
  @Roles(UserRole.MAINTAINER)
  @ApiOperation({
    summary: 'Add a maintainer to project (MAINTAINER owner only)',
    description: 'Adds a new maintainer to the project. Only project owners can add maintainers.',
  })
  @ApiParam({ name: 'id', type: String, description: 'Project UUID' })
  @ApiResponse({
    status: 201,
    description: 'Maintainer added successfully',
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Must be project owner' })
  @ApiResponse({ status: 404, description: 'Project or user not found' })
  @ApiResponse({ status: 409, description: 'Maintainer already added' })
  addMaintainer(
    @Param('id') id: string,
    @Body() dto: AddMaintainerDto,
    @CurrentUser() user: any,
  ) {
    return this.projectsService.addMaintainer(id, dto, user.user_id);
  }

  @Delete(':id/maintainers/:maintainerId')
  @Roles(UserRole.MAINTAINER)
  @ApiOperation({
    summary: 'Remove a maintainer from project (MAINTAINER owner only)',
    description:
      'Removes a maintainer from the project. Cannot remove the last owner. Only project owners can remove maintainers.',
  })
  @ApiParam({ name: 'id', type: String, description: 'Project UUID' })
  @ApiParam({ name: 'maintainerId', type: String, description: 'Maintainer User UUID' })
  @ApiResponse({
    status: 200,
    description: 'Maintainer removed successfully',
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Cannot remove last owner' })
  @ApiResponse({ status: 403, description: 'Forbidden - Must be project owner' })
  @ApiResponse({ status: 404, description: 'Project or maintainer not found' })
  @HttpCode(HttpStatus.OK)
  removeMaintainer(
    @Param('id') id: string,
    @Param('maintainerId') maintainerId: string,
    @CurrentUser() user: any,
  ) {
    return this.projectsService.removeMaintainer(id, maintainerId, user.user_id);
  }
}
