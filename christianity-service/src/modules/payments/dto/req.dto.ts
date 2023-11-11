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
  @IsString()
  @ApiProperty()
  public cardNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  public exp_month: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  public exp_year: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public cvc: string;

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
