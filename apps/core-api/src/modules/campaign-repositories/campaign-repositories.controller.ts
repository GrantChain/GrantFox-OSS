import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CampaignRepositoriesService } from './campaign-repositories.service';
import { AddRepositoriesToCampaignDto } from './dto/add-repositories-to-campaign.dto';
import { CampaignRepositoryResponseDto } from './dto/campaign-repository-response.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';
import { SupabaseAuthGuard } from '../../auth/supabase-auth.guard';

@ApiTags('campaign-repositories')
@Controller('campaign-repositories')
@UseGuards(SupabaseAuthGuard, RolesGuard)
export class CampaignRepositoriesController {
  constructor(
    private readonly campaignRepositoriesService: CampaignRepositoriesService,
  ) {}

  @Post('campaign/:campaignId/repositories')
  @Roles(UserRole.MAINTAINER)
  @ApiOperation({
    summary: 'Add repositories to a campaign (MAINTAINER only)',
    description:
      'Adds repositories to an ACTIVE campaign. Only project maintainers can add their own repositories. Validates: project APPROVED, repo active, not in another ACTIVE campaign.',
  })
  @ApiParam({ name: 'campaignId', type: String, description: 'Campaign UUID' })
  @ApiResponse({
    status: 201,
    description: 'Repositories added successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Campaign not ACTIVE or validation failed',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Must be project maintainer',
  })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  @ApiResponse({
    status: 409,
    description: 'Repository already in another ACTIVE campaign',
  })
  addRepositoriesToCampaign(
    @Param('campaignId') campaignId: string,
    @Body() dto: AddRepositoriesToCampaignDto,
    @CurrentUser() user: any,
  ) {
    return this.campaignRepositoriesService.addRepositoriesToCampaign(
      campaignId,
      dto,
      user.user_id,
    );
  }

  @Get('campaign/:campaignId/repositories')
  @ApiOperation({
    summary: 'Get all repositories in a campaign',
    description:
      'Returns all active repositories participating in a campaign, with project details.',
  })
  @ApiParam({ name: 'campaignId', type: String, description: 'Campaign UUID' })
  @ApiResponse({
    status: 200,
    description: 'List of repositories in campaign',
    type: [CampaignRepositoryResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  getRepositoriesByCampaign(@Param('campaignId') campaignId: string) {
    return this.campaignRepositoriesService.getRepositoriesByCampaign(
      campaignId,
    );
  }

  @Get('repository/:repoId/campaigns')
  @ApiOperation({
    summary: 'Get all campaigns for a repository',
    description:
      'Returns complete campaign history for a repository (all campaigns it has participated in).',
  })
  @ApiParam({
    name: 'repoId',
    type: Number,
    description: 'GitHub Repository ID',
  })
  @ApiResponse({
    status: 200,
    description: 'List of campaigns',
  })
  @ApiResponse({ status: 404, description: 'Repository not found' })
  getCampaignsByRepository(@Param('repoId', ParseIntPipe) repoId: number) {
    return this.campaignRepositoriesService.getCampaignsByRepository(repoId);
  }

  @Get('repository/:repoId/active-campaign')
  @ApiOperation({
    summary: 'Get active campaign for a repository',
    description:
      'Returns the current ACTIVE campaign the repository is participating in (if any).',
  })
  @ApiParam({
    name: 'repoId',
    type: Number,
    description: 'GitHub Repository ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Active campaign or null',
  })
  @ApiResponse({ status: 404, description: 'Repository not found' })
  getActiveCampaignForRepository(@Param('repoId', ParseIntPipe) repoId: number) {
    return this.campaignRepositoriesService.getActiveCampaignForRepository(
      repoId,
    );
  }

  @Get('campaign/:campaignId/repositories/:repoId/check')
  @ApiOperation({
    summary: 'Check if repository is in campaign',
    description: 'Returns boolean indicating if repository is in the campaign.',
  })
  @ApiParam({ name: 'campaignId', type: String, description: 'Campaign UUID' })
  @ApiParam({
    name: 'repoId',
    type: Number,
    description: 'GitHub Repository ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Check result',
  })
  checkRepositoryInCampaign(
    @Param('campaignId') campaignId: string,
    @Param('repoId', ParseIntPipe) repoId: number,
  ) {
    return this.campaignRepositoriesService.checkRepositoryInCampaign(
      campaignId,
      repoId,
    );
  }

  @Delete('campaign/:campaignId/repositories/:repoId')
  @Roles(UserRole.MAINTAINER)
  @ApiOperation({
    summary: 'Remove repository from campaign (MAINTAINER only)',
    description:
      'Removes a repository from a campaign. Only project maintainers can remove their repositories.',
  })
  @ApiParam({ name: 'campaignId', type: String, description: 'Campaign UUID' })
  @ApiParam({
    name: 'repoId',
    type: Number,
    description: 'GitHub Repository ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Repository removed successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Must be project maintainer',
  })
  @ApiResponse({
    status: 404,
    description: 'Repository not in campaign',
  })
  @HttpCode(HttpStatus.OK)
  removeRepositoryFromCampaign(
    @Param('campaignId') campaignId: string,
    @Param('repoId', ParseIntPipe) repoId: number,
    @CurrentUser() user: any,
  ) {
    return this.campaignRepositoriesService.removeRepositoryFromCampaign(
      campaignId,
      repoId,
      user.user_id,
    );
  }
}
