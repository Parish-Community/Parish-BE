import { Currency } from '@/core/constants';
import {
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  public amount: number;

  @IsNotEmpty()
  @IsEnum(Currency, {
    message: `currency must be one of the following values: ${Object.values(
      Currency,
    ).join(', ')}`,
  })
  @ApiProperty()
  public currency: Currency;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public description: string;
}
