import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import {
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiResponse,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRole } from '@prisma/client';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiOperation({
    summary: 'Create a new user with a specific role',
    description:
      'Creates a new user with an initial role. Email must be unique. Avatar image is optional.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['user_id', 'email', 'username', 'role'],
      properties: {
        user_id: { type: 'string', format: 'uuid', description: 'User ID from Supabase Auth' },
        email: { type: 'string', format: 'email' },
        username: { type: 'string' },
        role: { type: 'string', enum: ['ADMIN', 'MAINTAINER', 'CONTRIBUTOR'] },
        avatar: { type: 'string', format: 'binary', description: 'Optional avatar image' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Email or username already exists' })
  create(
    @Body() dto: CreateUserDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.usersService.create(dto, avatar);
  }

  @Get()
  @ApiOperation({
    summary: 'List all users',
    description: 'Returns all active users by default',
  })
  @ApiQuery({
    name: 'includeInactive',
    required: false,
    type: Boolean,
    description: 'Include inactive users in the results',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [UserResponseDto],
  })
  findAll(@Query('includeInactive') includeInactive?: string) {
    return this.usersService.findAll(includeInactive === 'true');
  }

  @Get('by-role/:role')
  @ApiOperation({
    summary: 'Get users by role',
    description: 'Returns all active users with the specified role',
  })
  @ApiParam({
    name: 'role',
    enum: UserRole,
    description: 'User role to filter by',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users with the specified role',
    type: [UserResponseDto],
  })
  findByRole(@Param('role') role: UserRole) {
    return this.usersService.findByRole(role);
  }

  @Get('by-email/:email')
  @ApiOperation({ summary: 'Get a user by email' })
  @ApiParam({ name: 'email', type: String })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get('by-username/:username')
  @ApiOperation({ summary: 'Get a user by username' })
  @ApiParam({ name: 'username', type: String })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'Returns user with all related profiles and wallets',
  })
  @ApiParam({ name: 'id', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user information',
    description: 'Updates basic user information (username, avatar)',
  })
  @ApiParam({ name: 'id', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'Username already taken' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Post(':id/roles')
  @ApiOperation({
    summary: 'Add a role to a user',
    description:
      'Adds a new role to the user without overwriting existing roles',
  })
  @ApiParam({ name: 'id', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 200,
    description: 'Role added successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'User already has this role' })
  addRole(@Param('id') id: string, @Body() dto: AddRoleDto) {
    return this.usersService.addRole(id, dto);
  }

  @Delete(':id/roles/:role')
  @ApiOperation({
    summary: 'Remove a role from a user',
    description: 'Removes a specific role from the user',
  })
  @ApiParam({ name: 'id', type: String, description: 'User UUID' })
  @ApiParam({ name: 'role', enum: UserRole, description: 'Role to remove' })
  @ApiResponse({
    status: 200,
    description: 'Role removed successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'User does not have this role' })
  removeRole(@Param('id') id: string, @Param('role') role: UserRole) {
    return this.usersService.removeRole(id, role);
  }

  @Patch(':id/deactivate')
  @ApiOperation({
    summary: 'Soft delete a user',
    description: 'Deactivates a user by setting is_active to false',
  })
  @ApiParam({ name: 'id', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 200,
    description: 'User deactivated successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'User is already inactive' })
  @HttpCode(HttpStatus.OK)
  softDelete(@Param('id') id: string) {
    return this.usersService.softDelete(id);
  }

  @Patch(':id/reactivate')
  @ApiOperation({
    summary: 'Reactivate a user',
    description: 'Reactivates a soft-deleted user by setting is_active to true',
  })
  @ApiParam({ name: 'id', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 200,
    description: 'User reactivated successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'User is already active' })
  @HttpCode(HttpStatus.OK)
  reactivate(@Param('id') id: string) {
    return this.usersService.reactivate(id);
  }

  @Patch(':id/clean-roles')
  @ApiOperation({
    summary: 'Clean duplicate roles from a user',
    description:
      'Removes duplicate roles from a user. Useful for fixing data inconsistencies.',
  })
  @ApiParam({ name: 'id', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 200,
    description: 'Duplicate roles cleaned successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(HttpStatus.OK)
  cleanDuplicateRoles(@Param('id') id: string) {
    return this.usersService.cleanDuplicateRoles(id);
  }
}
