import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveItemDto {
  @IsString()
  @ApiProperty()
  itemId: string;
}
