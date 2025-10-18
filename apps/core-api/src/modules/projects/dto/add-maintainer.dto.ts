import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class AddMaintainerDto {
  @ApiProperty({
    description: 'User ID of the maintainer to add',
    example: 'ee746352-e319-4b3a-8963-b24c3016cca9',
  })
  @IsString()
  @IsNotEmpty()
  maintainer_id: string;

  @ApiProperty({
    description: 'Is this maintainer an owner of the project',
    example: false,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  is_owner?: boolean;
}
