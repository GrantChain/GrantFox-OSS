import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { EscrowType } from '@prisma/client';

export class CreateEscrowDto {
  @ApiProperty({
    description: 'Escrow ID from Stellar blockchain',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsUUID()
  @IsNotEmpty()
  escrow_id: string;

  @ApiProperty({
    description: 'Type of escrow',
    enum: EscrowType,
    example: EscrowType.MAINTAINER,
  })
  @IsEnum(EscrowType)
  @IsNotEmpty()
  escrow_type: EscrowType;

  @ApiProperty({
    description: 'Campaign ID',
    example: 'b1ffcc88-8c1b-3bf9-aa7c-5aa8ac270b22',
  })
  @IsUUID()
  @IsNotEmpty()
  campaign_id: string;
}
