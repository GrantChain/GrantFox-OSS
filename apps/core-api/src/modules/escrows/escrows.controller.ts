import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
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
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create a new escrow (ADMIN only)',
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
  @ApiResponse({ status: 403, description: 'Forbidden - ADMIN role required' })
  create(@Body() dto: CreateEscrowDto, @CurrentUser() user: any) {
    return this.escrowsService.create(dto, user.user_id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all escrows',
    description: 'Returns all escrows with campaign and repository details',
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
    description: 'Returns a single escrow with campaign and repository details',
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
      'Returns all escrows for a specific campaign with repository details',
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
