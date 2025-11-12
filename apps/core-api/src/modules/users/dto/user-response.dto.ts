import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { PrimaryWalletDto } from './primary-wallet.dto';

export class UserResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  user_id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'johndoe', nullable: true })
  username: string | null;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    nullable: true,
  })
  avatar_url: string | null;

  @ApiProperty({ enum: UserRole, isArray: true, example: [UserRole.CONTRIBUTOR] })
  roles: UserRole[];

  @ApiProperty({ example: true })
  is_active: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updated_at: Date;

  @ApiProperty({
    type: [PrimaryWalletDto],
    description: 'Primary wallets for each role the user has',
    example: [
      { role: 'CONTRIBUTOR', primaryWallet: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' },
      { role: 'MAINTAINER', primaryWallet: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' },
    ],
  })
  primaryWallets?: PrimaryWalletDto[];
}
