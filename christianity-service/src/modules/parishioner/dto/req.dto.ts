import { GENDER, POSITION_PARISH } from '@/core/constants';
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

  @IsNotEmpty({ message: 'The position is required' })
  @IsEnum(POSITION_PARISH, {
    message: `The type of course status must be belonged to the enum ${Object.values(
      POSITION_PARISH,
    )}`,
  })
  @ApiProperty({
    example: POSITION_PARISH.CHRISTIANITY,
  })
  position: POSITION_PARISH;
}

export class UpdateProfileReqDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  fullname: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  christianName: string;

  @IsOptional()
  @IsEnum(GENDER, {
    message: `The type of gender must be belonged to the enum ${Object.values(
      GENDER,
    )}`,
  })
  @ApiProperty()
  gender?: GENDER;

  @IsOptional()
  @IsDateString({}, { message: 'The date of birth must be date type' })
  @ApiProperty({
    example: '2021-01-01',
  })
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name_father: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name_mother: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  god_parent: string;

  @IsOptional()
  @IsString({ message: 'The phone number must be string' })
  @MinLength(10)
  @MaxLength(10)
  @ApiProperty()
  phonenumber: string;

  @IsOptional()
  @ApiProperty({ example: 'https://i.pravatar.cc/300', required: false })
  avatar?: string;

  // @IsNotEmpty({ message: 'The address is required' })
  @IsOptional()
  @ApiProperty({ example: '363 Nguyen Huu Tho', required: true })
  address?: string;

  // @IsNotEmpty({ message: 'The diocese is required' })
  @IsOptional()
  @ApiProperty({ example: 'Hà Tĩnh', required: true })
  diocese?: string;

  // @IsNotEmpty({ message: 'The parish is required' })
  @IsOptional()
  @ApiProperty({ example: 'Tràng Lưu', required: true })
  parish?: string;

  // @IsNotEmpty({ message: 'The parish_clusterId is required' })
  @IsOptional()
  @IsInt()
  @ApiProperty()
  parish_clusterId: number;

  @IsOptional()
  @IsEnum(POSITION_PARISH, {
    message: `The type of course status must be belonged to the enum ${Object.values(
      POSITION_PARISH,
    )}`,
  })
  @ApiProperty({
    example: POSITION_PARISH.CHRISTIANITY,
  })
  position: POSITION_PARISH;
}

export class FileImportDataReqDto {
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

  @IsOptional()
  @IsString({ message: 'The phone number must be string' })
  @MinLength(10)
  @MaxLength(10)
  @IsNotEmpty()
  @ApiProperty()
  phonenumber: string;

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

  @IsNotEmpty({ message: 'The position is required' })
  @IsEnum(POSITION_PARISH, {
    message: `The type of course status must be belonged to the enum ${Object.values(
      POSITION_PARISH,
    )}`,
  })
  @ApiProperty({
    example: POSITION_PARISH.CHRISTIANITY,
  })
  position: POSITION_PARISH;
}

export class RegistrationAccountReqDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  fullname: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  christianName: string;

  @IsNotEmpty({ message: 'The password is required' })
  @IsString()
  @MinLength(8)
  @MaxLength(12)
  @ApiProperty()
  readonly password: string;

  // @IsOptional()
  // @IsEnum(GENDER, {
  //   message: `The type of gender must be belonged to the enum ${Object.values(
  //     GENDER,
  //   )}`,
  // })
  // @ApiProperty()
  // gender?: GENDER;

  // @IsOptional()
  // @IsDateString({}, { message: 'The date of birth must be date type' })
  // @ApiProperty({
  //   example: '2021-01-01',
  // })
  // dateOfBirth?: Date;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // name_father: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // name_mother: string;

  @IsOptional()
  @IsString({ message: 'The phone number must be string' })
  @MinLength(10)
  @MaxLength(10)
  @ApiProperty()
  phonenumber: string;

  // @IsOptional()
  // @ApiProperty({ example: 'https://i.pravatar.cc/300', required: false })
  // avatar?: string;

  // @IsOptional()
  // @IsInt()
  // @ApiProperty()
  // parish_clusterId: number;
}
