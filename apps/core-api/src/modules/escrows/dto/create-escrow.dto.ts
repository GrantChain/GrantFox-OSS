import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { EscrowType } from '@prisma/client';

export class CreateEscrowDto {
  @ApiProperty({
    description: 'Escrow ID from Stellar blockchain',
    example: 'stellar-escrow-12345',
  })
  @IsString()
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

  @ApiProperty({
    description: 'Project ID',
    example: 'c2ggdd99-9d2c-4cg0-bb8d-7bb0ce491c33',
  })
  @IsUUID()
  @IsNotEmpty()
  project_id: string;
}
