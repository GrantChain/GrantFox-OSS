import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class TransferOwnershipDto {
  @ApiProperty({
    description: 'User ID of the new owner',
    example: 'ee746352-e319-4b3a-8963-b24c3016cca9',
  })
  @IsUUID()
  @IsNotEmpty()
  new_owner_id: string;
}
