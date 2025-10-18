import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
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
      'Creates a new wallet for a user. If is_primary is true, it will unset other primary wallets.',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 201,
    description: 'Wallet created successfully',
    type: WalletResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'Wallet address already registered' })
  create(@Param('userId') userId: string, @Body() dto: CreateWalletDto) {
    return this.walletsService.create(userId, dto);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get all wallets for a user',
    description:
      'Returns all wallets associated with a user, ordered by primary first, then by creation date.',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User UUID' })
  @ApiResponse({
    status: 200,
    description: 'List of user wallets',
    type: [WalletResponseDto],
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findAllByUser(@Param('userId') userId: string) {
    return this.walletsService.findAllByUser(userId);
  }

  @Get(':walletId')
  @ApiOperation({
    summary: 'Get a wallet by ID',
    description: 'Returns a single wallet by its ID',
  })
  @ApiParam({ name: 'walletId', type: String, description: 'Wallet UUID' })
  @ApiResponse({
    status: 200,
    description: 'Wallet found',
    type: WalletResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  findOne(@Param('walletId') walletId: string) {
    return this.walletsService.findOne(walletId);
  }

  @Patch('user/:userId/:walletId/set-primary')
  @ApiOperation({
    summary: 'Set a wallet as primary',
    description:
      'Marks a wallet as primary and unsets all other wallets for the user.',
  })
  @ApiParam({ name: 'userId', type: String, description: 'User UUID' })
  @ApiParam({ name: 'walletId', type: String, description: 'Wallet UUID' })
  @ApiResponse({
    status: 200,
    description: 'Wallet set as primary',
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
