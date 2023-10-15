import { GENDER } from '../../../../common/enums/enum.value';
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

export class CreateProfileReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  christianName: string;

  @IsNotEmpty()
  @IsEnum(GENDER, {
    message: `The type of gender must be belonged to the enum ${Object.values(
      GENDER,
    )}`,
  })
  @ApiProperty()
  gender?: GENDER;

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

  @IsOptional()
  @IsString({ message: 'The phone number must be string' })
  @MinLength(10)
  @MaxLength(10)
  @IsNotEmpty()
  @ApiProperty()
  phonenumber: string;

  @IsOptional()
  @ApiProperty({ example: 'https://i.pravatar.cc/300', required: false })
  avatar?: string;

  @IsNotEmpty({ message: 'The address is required' })
  @ApiProperty({ example: '363 Nguyen Huu Tho', required: true })
  address?: string;

  @IsNotEmpty({ message: 'The diocese is required' })
  @ApiProperty({ example: 'Hà Tĩnh', required: true })
  diocese?: string;

  @IsNotEmpty({ message: 'The parish is required' })
  @ApiProperty({ example: 'Tràng Lưu', required: true })
  parish?: string;

  @IsNotEmpty({ message: 'The parish_clusterId is required' })
  @IsInt()
  @ApiProperty()
  parish_clusterId: number;
}
