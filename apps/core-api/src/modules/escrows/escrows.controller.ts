import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { EscrowsService } from './escrows.service';
import { CreateEscrowDto } from './dto/create-escrow.dto';
import { UpdateEscrowDto } from './dto/update-escrow.dto';
import { EscrowResponseDto } from './dto/escrow-response.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('escrows')
@Controller('escrows')
@UseGuards(RolesGuard)
export class EscrowsController {
  constructor(private readonly escrowsService: EscrowsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MAINTAINER)
  @ApiOperation({
    summary: 'Create a new escrow (ADMIN or MAINTAINER)',
    description:
      'Creates a new escrow linked to a campaign. Escrow ID comes from Stellar blockchain.',
  })
  @ApiResponse({
    status: 201,
    description: 'Escrow created successfully',
    type: EscrowResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  @ApiResponse({ status: 409, description: 'Escrow ID already exists' })
  @ApiResponse({ status: 403, description: 'Forbidden - ADMIN or MAINTAINER role required' })
  create(@Body() dto: CreateEscrowDto, @CurrentUser() user: any) {
    return this.escrowsService.create(dto, user.user_id);
  }

  @Get('check')
  @ApiOperation({
    summary: 'Check if escrow exists for campaign and project',
    description:
      'Validates if an escrow already exists for a specific campaign and project combination',
  })
  @ApiQuery({
    name: 'campaign_id',
    type: String,
    description: 'Campaign UUID',
    required: true,
  })
  @ApiQuery({
    name: 'project_id',
    type: String,
    description: 'Project UUID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Validation result',
    schema: {
      type: 'object',
      properties: {
        exists: { type: 'boolean' },
        escrow_id: { type: 'string', nullable: true },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Missing required parameters' })
  checkExists(
    @Query('campaign_id') campaignId: string,
    @Query('project_id') projectId: string,
  ) {
    return this.escrowsService.checkEscrowExists(campaignId, projectId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all escrows',
    description: 'Returns all escrows with campaign, project and repository details',
  })
  @ApiResponse({
    status: 200,
    description: 'List of escrows',
    type: [EscrowResponseDto],
  })
  findAll() {
    return this.escrowsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get escrow by ID',
    description: 'Returns a single escrow with campaign, project and repository details',
  })
  @ApiParam({ name: 'id', type: String, description: 'Escrow UUID' })
  @ApiResponse({
    status: 200,
    description: 'Escrow found',
    type: EscrowResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Escrow not found' })
  findOne(@Param('id') id: string) {
    return this.escrowsService.findOne(id);
  }

  @Get('campaign/:campaignId')
  @ApiOperation({
    summary: 'Get escrows by campaign ID',
    description:
      'Returns all escrows for a specific campaign with project and repository details',
  })
  @ApiParam({ name: 'campaignId', type: String, description: 'Campaign UUID' })
  @ApiResponse({
    status: 200,
    description: 'List of escrows for the campaign',
    type: [EscrowResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  findByCampaign(@Param('campaignId') campaignId: string) {
    return this.escrowsService.findByCampaign(campaignId);
  }

  @Get('project/:projectId')
  @ApiOperation({
    summary: 'Get escrows by project ID',
    description:
      'Returns all escrows for a specific project across all campaigns',
  })
  @ApiParam({ name: 'projectId', type: String, description: 'Project UUID' })
  @ApiResponse({
    status: 200,
    description: 'List of escrows for the project',
    type: [EscrowResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findByProject(@Param('projectId') projectId: string) {
    return this.escrowsService.findByProject(projectId);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Update escrow (ADMIN only)',
    description: 'Updates escrow information',
  })
  @ApiParam({ name: 'id', type: String, description: 'Escrow UUID' })
  @ApiResponse({
    status: 200,
    description: 'Escrow updated successfully',
    type: EscrowResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Escrow not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - ADMIN role required' })
  update(@Param('id') id: string, @Body() dto: UpdateEscrowDto) {
    return this.escrowsService.update(id, dto);
  }

}
