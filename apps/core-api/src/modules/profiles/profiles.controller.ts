import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import {
  CreateMaintainerProfileDto,
  UpdateMaintainerProfileDto,
  CreateContributorProfileDto,
  UpdateContributorProfileDto,
  CreateAdminProfileDto,
} from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // =============================================
  // MAINTAINER PROFILE ENDPOINTS
  // =============================================

  @Post('maintainer')
  @ApiOperation({
    summary: 'Create a maintainer profile',
    description:
      'Creates a maintainer profile for a user. User must have MAINTAINER role.',
  })
  @ApiResponse({
    status: 201,
    description: 'Maintainer profile created successfully',
  })
  @ApiResponse({ status: 400, description: 'User does not have MAINTAINER role' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'Profile already exists' })
  @HttpCode(HttpStatus.CREATED)
  createMaintainerProfile(@Body() dto: CreateMaintainerProfileDto) {
    return this.profilesService.createMaintainerProfile(dto);
  }

  @Get('maintainer')
  @ApiOperation({
    summary: 'Get all maintainer profiles',
    description: 'Returns all maintainer profiles for active users',
  })
  @ApiResponse({
    status: 200,
    description: 'List of maintainer profiles',
  })
  getAllMaintainerProfiles() {
    return this.profilesService.getAllMaintainerProfiles();
  }

  @Get('maintainer/:userId')
  @ApiOperation({
    summary: 'Get maintainer profile by user ID',
    description: 'Returns a specific maintainer profile',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 200,
    description: 'Maintainer profile found',
  })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  getMaintainerProfile(@Param('userId') userId: string) {
    return this.profilesService.getMaintainerProfile(userId);
  }

  @Put('maintainer/:userId')
  @ApiOperation({
    summary: 'Update maintainer profile',
    description: 'Updates maintainer profile information',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  updateMaintainerProfile(
    @Param('userId') userId: string,
    @Body() dto: UpdateMaintainerProfileDto,
  ) {
    return this.profilesService.updateMaintainerProfile(userId, dto);
  }

  // =============================================
  // CONTRIBUTOR PROFILE ENDPOINTS
  // =============================================

  @Post('contributor')
  @ApiOperation({
    summary: 'Create a contributor profile',
    description:
      'Creates a contributor profile for a user. User must have CONTRIBUTOR role.',
  })
  @ApiResponse({
    status: 201,
    description: 'Contributor profile created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'User does not have CONTRIBUTOR role',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'Profile already exists' })
  @HttpCode(HttpStatus.CREATED)
  createContributorProfile(@Body() dto: CreateContributorProfileDto) {
    return this.profilesService.createContributorProfile(dto);
  }

  @Get('contributor')
  @ApiOperation({
    summary: 'Get all contributor profiles',
    description: 'Returns all contributor profiles for active users',
  })
  @ApiResponse({
    status: 200,
    description: 'List of contributor profiles',
  })
  getAllContributorProfiles() {
    return this.profilesService.getAllContributorProfiles();
  }

  @Get('contributor/search')
  @ApiOperation({
    summary: 'Search contributors by skills',
    description:
      'Returns contributors that have at least one of the specified skills',
  })
  @ApiQuery({
    name: 'skills',
    type: String,
    description: 'Comma-separated list of skills',
    example: 'TypeScript,React,Solidity',
  })
  @ApiResponse({
    status: 200,
    description: 'List of matching contributor profiles',
  })
  searchContributorsBySkills(@Query('skills') skills: string) {
    const skillsArray = skills.split(',').map((s) => s.trim());
    return this.profilesService.searchContributorsBySkills(skillsArray);
  }

  @Get('contributor/:userId')
  @ApiOperation({
    summary: 'Get contributor profile by user ID',
    description: 'Returns a specific contributor profile',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 200,
    description: 'Contributor profile found',
  })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  getContributorProfile(@Param('userId') userId: string) {
    return this.profilesService.getContributorProfile(userId);
  }

  @Put('contributor/:userId')
  @ApiOperation({
    summary: 'Update contributor profile',
    description: 'Updates contributor profile information',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  updateContributorProfile(
    @Param('userId') userId: string,
    @Body() dto: UpdateContributorProfileDto,
  ) {
    return this.profilesService.updateContributorProfile(userId, dto);
  }

  // =============================================
  // ADMIN PROFILE ENDPOINTS
  // =============================================

  @Post('admin')
  @ApiOperation({
    summary: 'Create an admin profile',
    description:
      'Creates an admin profile for a user. User must have ADMIN role.',
  })
  @ApiResponse({
    status: 201,
    description: 'Admin profile created successfully',
  })
  @ApiResponse({ status: 400, description: 'User does not have ADMIN role' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'Profile already exists' })
  @HttpCode(HttpStatus.CREATED)
  createAdminProfile(@Body() dto: CreateAdminProfileDto) {
    return this.profilesService.createAdminProfile(dto);
  }

  @Get('admin')
  @ApiOperation({
    summary: 'Get all admin profiles',
    description: 'Returns all admin profiles for active users',
  })
  @ApiResponse({
    status: 200,
    description: 'List of admin profiles',
  })
  getAllAdminProfiles() {
    return this.profilesService.getAllAdminProfiles();
  }

  @Get('admin/:userId')
  @ApiOperation({
    summary: 'Get admin profile by user ID',
    description: 'Returns a specific admin profile',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 200,
    description: 'Admin profile found',
  })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  getAdminProfile(@Param('userId') userId: string) {
    return this.profilesService.getAdminProfile(userId);
  }
}
