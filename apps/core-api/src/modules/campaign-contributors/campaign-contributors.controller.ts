import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CampaignContributorsService } from './campaign-contributors.service';
import { CampaignContributorResponseDto } from './dto/campaign-contributor-response.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Public } from '../../common/decorators';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';
import { SupabaseAuthGuard } from '../../auth/supabase-auth.guard';

@ApiTags('campaign-contributors')
@Controller('campaign-contributors')
@UseGuards(SupabaseAuthGuard, RolesGuard)
@ApiBearerAuth()
export class CampaignContributorsController {
  constructor(
    private readonly campaignContributorsService: CampaignContributorsService,
  ) {}

  @Post('campaign/:campaignId/register')
  @Roles(UserRole.CONTRIBUTOR)
  @ApiOperation({
    summary: 'Register to campaign (CONTRIBUTOR only)',
    description:
      'Registers a contributor to an ACTIVE campaign. Contributors can only register once per campaign.',
  })
  @ApiParam({ name: 'campaignId', type: String, description: 'Campaign UUID' })
  @ApiResponse({
    status: 201,
    description: 'Successfully registered to campaign',
    type: CampaignContributorResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Campaign not ACTIVE or user not a CONTRIBUTOR',
  })
  @ApiResponse({ status: 404, description: 'Campaign or user not found' })
  @ApiResponse({
    status: 409,
    description: 'Already registered to this campaign',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - CONTRIBUTOR role required',
  })
  register(@Param('campaignId') campaignId: string, @CurrentUser() user: any) {
    return this.campaignContributorsService.register(
      campaignId,
      user.user_id,
    );
  }

  @Public()  
  @Get('campaign/:campaignId')
  @ApiOperation({
    summary: 'Get contributors by campaign',
    description: 'Returns all contributors registered to a campaign',
  })
  @ApiParam({ name: 'campaignId', type: String, description: 'Campaign UUID' })
  @ApiResponse({
    status: 200,
    description: 'List of contributors',
  })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  getContributorsByCampaign(@Param('campaignId') campaignId: string) {
    return this.campaignContributorsService.getContributorsByCampaign(
      campaignId,
    );
  }

  @Public()  
  @Get('contributor/:contributorId')
  @ApiOperation({
    summary: 'Get campaigns by contributor',
    description: 'Returns all campaigns a contributor is registered to',
  })
  @ApiParam({
    name: 'contributorId',
    type: String,
    description: 'Contributor user UUID',
  })
  @ApiResponse({
    status: 200,
    description: 'List of campaigns',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  getCampaignsByContributor(@Param('contributorId') contributorId: string) {
    return this.campaignContributorsService.getCampaignsByContributor(
      contributorId,
    );
  }
}
