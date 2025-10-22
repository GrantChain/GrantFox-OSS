import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { EscrowType } from '@prisma/client';

export class UpdateEscrowDto {
  @ApiProperty({
    description: 'Type of escrow',
    enum: EscrowType,
    example: EscrowType.CONTRIBUTOR,
    required: false,
  })
  @IsOptional()
  @IsEnum(EscrowType)
  escrow_type?: EscrowType;
}
