import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  MinLength,
  MaxLength,
  IsInt,
} from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class LoginReqDto {
  @IsNotEmpty({ message: 'The phonenumber is required' })
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @ApiProperty()
  readonly phonenumber: string;

  @IsNotEmpty({ message: 'The password is required' })
  @IsString()
  @MinLength(8)
  @MaxLength(12)
  @ApiProperty()
  readonly password: string;
}
