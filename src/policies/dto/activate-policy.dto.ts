import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ActivatePolicyDto {
  @ApiProperty()
  @IsNumber()
  planId: number;
}
