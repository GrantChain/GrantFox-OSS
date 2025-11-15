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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { CampaignsService } from './campaigns.service';
import { CampaignsExtendedService } from './campaigns-extended.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { UpdateCampaignStatusDto } from './dto/update-campaign-status.dto';
import { CampaignResponseDto } from './dto/campaign-response.dto';
import { CampaignResultsResponseDto } from './dto/campaign-results.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, CampaignStatus } from '@prisma/client';
import { SupabaseAuthGuard } from '../../auth/supabase-auth.guard';

@ApiTags('campaigns')
@Controller('campaigns')
@UseGuards(SupabaseAuthGuard, RolesGuard)  // SupabaseAuthGuard PRIMERO, luego RolesGuard
export class CampaignsController {
  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly campaignsExtendedService: CampaignsExtendedService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    summary: 'Create a new campaign (ADMIN only)',
    description:
      'Creates a new campaign. Only accessible by users with ADMIN role. Campaign image is optional.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'description', 'start_date', 'end_date'],
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
        start_date: { type: 'string', format: 'date-time' },
        end_date: { type: 'string', format: 'date-time' },
        image: { type: 'string', format: 'binary', description: 'Optional campaign image' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Campaign created successfully',
    type: CampaignResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 403, description: 'Forbidden - ADMIN role required' })
  create(
    @Body() createCampaignDto: CreateCampaignDto,
    @CurrentUser() user: any,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.campaignsService.create(createCampaignDto, user.user_id, image);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all campaigns',
    description: 'Returns all campaigns, optionally filtered by status',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: CampaignStatus,
    description: 'Filter campaigns by status',
  })
  @ApiResponse({
    status: 200,
    description: 'List of campaigns',
    type: [CampaignResponseDto],
  })
  findAll(@Query('status') status?: CampaignStatus) {
    return this.campaignsService.findAll(status);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a campaign by ID',
    description: 'Returns a single campaign with all its repositories',
  })
  @ApiParam({ name: 'id', type: String, description: 'Campaign UUID' })
  @ApiResponse({
    status: 200,
    description: 'Campaign found',
    type: CampaignResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Update a campaign (ADMIN only)',
    description:
      'Updates campaign information. Does not affect repository associations.',
  })
  @ApiParam({ name: 'id', type: String, description: 'Campaign UUID' })
  @ApiResponse({
    status: 200,
    description: 'Campaign updated successfully',
    type: CampaignResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 403, description: 'Forbidden - ADMIN role required' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignsService.update(id, updateCampaignDto);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Update campaign status (ADMIN only)',
    description: `Changes the status of a campaign. Business rules:
    - Only 1 ACTIVE campaign allowed at a time
    - Only 1 UPCOMING campaign allowed at a time
    - Only 1 FINISHED campaign allowed at a time (most recent finished campaign for rewards release)`,
  })
  @ApiParam({ name: 'id', type: String, description: 'Campaign UUID' })
  @ApiResponse({
    status: 200,
    description: 'Campaign status updated successfully',
    type: CampaignResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden - ADMIN role required' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict - Another campaign already has the requested status (ACTIVE/UPCOMING/FINISHED)' 
  })
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateCampaignStatusDto,
  ) {
    return this.campaignsService.updateStatus(id, updateStatusDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Delete a campaign (ADMIN only)',
    description:
      'Soft deletes a campaign by setting its status to INACTIVE',
  })
  @ApiParam({ name: 'id', type: String, description: 'Campaign UUID' })
  @ApiResponse({
    status: 200,
    description: 'Campaign status changed to INACTIVE',
    type: CampaignResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden - ADMIN role required' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(id);
  }

  @Get('active/with-projects')
  @ApiOperation({
    summary: 'Get all active campaigns with projects and repositories',
    description:
      'Returns all ACTIVE campaigns with their participating projects and repositories. Ideal for contributor landing page.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of active campaigns with projects',
  })
  getActiveCampaignsWithProjects() {
    return this.campaignsExtendedService.getActiveCampaignsWithProjects();
  }

  @Get(':id/projects-with-repos')
  @ApiOperation({
    summary: 'Get campaign with all projects and repositories',
    description:
      'Returns a campaign with all participating projects grouped with their repositories.',
  })
  @ApiParam({ name: 'id', type: String, description: 'Campaign UUID' })
  @ApiResponse({
    status: 200,
    description: 'Campaign with projects and repositories',
  })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  getCampaignWithProjectsAndRepos(@Param('id') id: string) {
    return this.campaignsExtendedService.getCampaignWithProjectsAndRepos(id);
  }

  @Get(':campaignId/projects/:projectId/results')
  @ApiOperation({
    summary: 'Get campaign results for a specific project',
    description:
      'Returns all completed issues (with merged PRs) for a FINISHED campaign, including contributor validation and wallet information.',
  })
  @ApiParam({ name: 'campaignId', type: String, description: 'Campaign UUID' })
  @ApiParam({ name: 'projectId', type: String, description: 'Project UUID' })
  @ApiResponse({
    status: 200,
    description: 'Campaign results with contributor information',
    type: CampaignResultsResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Campaign is not FINISHED' })
  @ApiResponse({ status: 404, description: 'Campaign or Project not found' })
  getCampaignResults(
    @Param('campaignId') campaignId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.campaignsExtendedService.getCampaignResults(campaignId, projectId);
  }
}

