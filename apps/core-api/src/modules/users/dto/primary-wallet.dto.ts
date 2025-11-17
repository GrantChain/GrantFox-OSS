import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class PrimaryWalletDto {
  @ApiProperty({
    enum: UserRole,
    example: UserRole.CONTRIBUTOR,
    description: 'Role associated with the wallet',
  })
  role: UserRole;

  @ApiProperty({
    example: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    description: 'Primary wallet address for this role',
  })
  primaryWallet: string;
}

