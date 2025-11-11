import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletResponseDto } from './dto/wallet-response.dto';

@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post('user/:userId')
  @ApiOperation({
    summary: 'Add a wallet to a user',
    description:
      'Creates a new wallet for a user with a specific role. If is_primary is true, it will unset other primary wallets for that role.',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 201,
    description: 'Wallet created successfully',
    type: WalletResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({
    status: 409,
    description:
      'Wallet address already registered for this role or user does not have the specified role',
  })
  create(@Param('userId') userId: string, @Body() dto: CreateWalletDto) {
    return this.walletsService.create(userId, dto);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get all wallets for a user',
    description:
      'Returns all wallets associated with a user. Can be filtered by role using query parameter.',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User UUID' })
  @ApiQuery({
    name: 'role',
    enum: UserRole,
    required: false,
    description: 'Filter wallets by role',
  })
  @ApiResponse({
    status: 200,
    description: 'List of user wallets',
    type: [WalletResponseDto],
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({
    status: 409,
    description: 'User does not have the specified role',
  })
  findAllByUser(
    @Param('userId') userId: string,
    @Query('role') role?: UserRole,
  ) {
    if (role) {
      return this.walletsService.findAllByUserAndRole(userId, role);
    }
    return this.walletsService.findAllByUser(userId);
  }

  @Get('user/:userId/primary')
  @ApiOperation({
    summary: 'Get primary wallet for a user',
    description:
      'Returns the primary wallet associated with a user. Can be filtered by role using query parameter.',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User UUID' })
  @ApiQuery({
    name: 'role',
    enum: UserRole,
    required: false,
    description: 'Filter primary wallet by role',
  })
  @ApiResponse({
    status: 200,
    description: 'Primary wallet found',
    type: WalletResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found or no primary wallet found',
  })
  findPrimaryByUser(
    @Param('userId') userId: string,
    @Query('role') role?: UserRole,
  ) {
    return this.walletsService.findPrimaryByUser(userId, role);
  }

  @Get('validate/:address')
  @ApiOperation({
    summary: 'Validate if a wallet address can be used',
    description:
      'Checks if a wallet address can be registered for a specific user and role. Provides detailed validation feedback.',
  })
  @ApiParam({
    name: 'address',
    type: String,
    description: 'Stellar wallet address',
  })
  @ApiQuery({
    name: 'userId',
    type: String,
    required: false,
    description:
      'User UUID. If provided, validates if THIS user can use this address',
  })
  @ApiQuery({
    name: 'role',
    enum: UserRole,
    required: false,
    description:
      'Role to validate for. If provided with userId, validates if the user can use this address for this role',
  })
  @ApiResponse({
    status: 200,
    description: 'Validation result with detailed information',
    schema: {
      type: 'object',
      properties: {
        canUse: {
          type: 'boolean',
          description: 'Whether the user can use this address (if userId provided)',
        },
        exists: {
          type: 'boolean',
          description: 'Whether the address is already registered',
        },
        reason: {
          type: 'string',
          description: 'Human-readable reason for the validation result',
        },
        address: { type: 'string', description: 'The validated address' },
        count: {
          type: 'number',
          description: 'Number of registrations (legacy, without userId)',
        },
        roles: {
          type: 'array',
          items: { type: 'string' },
          description: 'Roles using this address (legacy, without userId)',
        },
        existingWallets: {
          type: 'array',
          description:
            'Existing wallets for this user (if userId provided)',
          items: {
            type: 'object',
            properties: {
              role: { type: 'string' },
              is_primary: { type: 'boolean' },
            },
          },
        },
      },
    },
  })
  validateAddress(
    @Param('address') address: string,
    @Query('userId') userId?: string,
    @Query('role') role?: UserRole,
  ) {
    return this.walletsService.validateAddress(address, userId, role);
  }

  @Patch('user/:userId/:walletId/set-primary')
  @ApiOperation({
    summary: 'Set a wallet as primary',
    description:
      'Marks a wallet as primary for its role and unsets all other wallets for the user with the same role.',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User UUID' })
  @ApiParam({ name: 'walletId', type: String, description: 'Wallet UUID' })
  @ApiResponse({
    status: 200,
    description: 'Wallet set as primary for its role',
    type: WalletResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Wallet or user not found' })
  @ApiResponse({
    status: 409,
    description: 'Wallet does not belong to user',
  })
  @HttpCode(HttpStatus.OK)
  setPrimary(
    @Param('userId') userId: string,
    @Param('walletId') walletId: string,
  ) {
    return this.walletsService.setPrimary(userId, walletId);
  }
}
