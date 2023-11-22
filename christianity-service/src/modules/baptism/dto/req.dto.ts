import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  MinLength,
  MaxLength,
  IsInt,
  IsNumber,
  IsBoolean,
  IsEmpty,
} from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateBaptismReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  christianName: string;

  @IsNotEmpty()
  @IsDateString({}, { message: 'The date of birth must be date type' })
  @ApiProperty({
    example: '2021-01-01',
  })
  dateOfBirth?: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name_father: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name_mother: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  god_parent: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  parishCluster: string;

  @IsNotEmpty({ message: 'The address is required' })
  @ApiProperty({ example: '363 Nguyen Huu Tho', required: true })
  address: string;
}
