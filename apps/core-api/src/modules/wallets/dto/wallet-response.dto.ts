import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class WalletResponseDto {
  @ApiProperty()
  wallet_id: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  address: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty()
  is_primary: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
