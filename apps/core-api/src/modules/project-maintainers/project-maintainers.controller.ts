import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ProjectMaintainersService } from './project-maintainers.service';
import { TransferOwnershipDto } from './dto/transfer-ownership.dto';
import { MaintainerStatsDto } from './dto/maintainer-stats.dto';
import { ProjectMaintainerResponseDto } from './dto/project-maintainer-response.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Public } from '../../common/decorators';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';
import { SupabaseAuthGuard } from '../../auth/supabase-auth.guard';

@ApiTags('project-maintainers')
@Controller('project-maintainers')
@UseGuards(SupabaseAuthGuard, RolesGuard)
export class ProjectMaintainersController {
  constructor(
    private readonly projectMaintainersService: ProjectMaintainersService,
  ) {}

  @Public()  
  @Get('user/:userId/projects')
  @ApiOperation({
    summary: 'Get all projects for a maintainer',
    description:
      'Returns all active projects where the user is a maintainer, including ownership status.',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 200,
    description: 'List of projects with maintainer details',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  getProjectsByMaintainer(@Param('userId') userId: string) {
    return this.projectMaintainersService.getProjectsByMaintainer(userId);
  }

  @Public()  
  @Get('project/:projectId/maintainers')
  @ApiOperation({
    summary: 'Get all maintainers for a project',
    description:
      'Returns all active maintainers of a project, ordered by owners first.',
  })
  @ApiParam({ name: 'projectId', type: String, description: 'Project UUID' })
  @ApiResponse({
    status: 200,
    description: 'List of maintainers with details',
    type: [ProjectMaintainerResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  getMaintainersByProject(@Param('projectId') projectId: string) {
    return this.projectMaintainersService.getMaintainersByProject(projectId);
  }

  @Patch('project/:projectId/transfer-ownership')
  @Roles(UserRole.MAINTAINER)
  @ApiOperation({
    summary: 'Transfer project ownership (MAINTAINER owner only)',
    description:
      'Transfers ownership of a project to another maintainer. Only current owner can do this.',
  })
  @ApiParam({ name: 'projectId', type: String, description: 'Project UUID' })
  @ApiResponse({
    status: 200,
    description: 'Ownership transferred successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Cannot transfer to inactive maintainer',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Must be project owner' })
  @ApiResponse({ status: 404, description: 'Project or user not found' })
  @HttpCode(HttpStatus.OK)
  transferOwnership(
    @Param('projectId') projectId: string,
    @Body() dto: TransferOwnershipDto,
    @CurrentUser() user: any,
  ) {
    return this.projectMaintainersService.transferOwnership(
      projectId,
      dto,
      user.user_id,
    );
  }

  @Public()  
  @Get('user/:userId/stats')
  @ApiOperation({
    summary: 'Get maintainer statistics',
    description:
      'Returns statistics about projects for a maintainer (total, owned, active, pending, etc.)',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 200,
    description: 'Maintainer statistics',
    type: MaintainerStatsDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  getMaintainerStats(@Param('userId') userId: string) {
    return this.projectMaintainersService.getMaintainerStats(userId);
  }
}
