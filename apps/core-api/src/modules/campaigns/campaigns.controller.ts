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
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { UpdateCampaignStatusDto } from './dto/update-campaign-status.dto';
import { CampaignResponseDto } from './dto/campaign-response.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, CampaignStatus } from '@prisma/client';

@ApiTags('campaigns')
@Controller('campaigns')
@UseGuards(RolesGuard)
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create a new campaign (ADMIN only)',
    description:
      'Creates a new campaign. Only accessible by users with ADMIN role.',
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
  ) {
    return this.campaignsService.create(createCampaignDto, user.user_id);
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
    description: 'Changes the status of a campaign (PENDING, ACTIVE, INACTIVE)',
  })
  @ApiParam({ name: 'id', type: String, description: 'Campaign UUID' })
  @ApiResponse({
    status: 200,
    description: 'Campaign status updated successfully',
    type: CampaignResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden - ADMIN role required' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
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
}
