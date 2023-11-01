import { GENDER, PARISH_CLUSTER } from '@/core/constants';
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
import { Transform } from 'class-transformer';

export class CreateReqMarriageDto {
  // create according Marriage entity
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  first_student_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  first_student_email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  first_student_father: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  first_student_mother: string;

  @IsNotEmpty()
  @IsEnum(GENDER, {
    message: `The type of gender must be belonged to the enum ${Object.values(
      GENDER,
    )}`,
  })
  @ApiProperty()
  first_student_gender: GENDER;

  @IsDateString({}, { message: 'The date of birth must be date type' })
  @IsNotEmpty()
  @ApiProperty({
    example: '2021-01-01',
  })
  first_student_DOB: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Tràng Lưu',
  })
  first_student_parish: string;

  @IsNotEmpty()
  @IsEnum(PARISH_CLUSTER, {
    message: `The type of parish cluster must be belonged to the enum ${Object.values(
      PARISH_CLUSTER,
    )}`,
  })
  @ApiProperty()
  first_parish_cluster: PARISH_CLUSTER;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  second_student_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  second_student_email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  second_student_father: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  second_student_mother: string;

  @IsNotEmpty()
  @IsEnum(GENDER, {
    message: `The type of gender must be belonged to the enum ${Object.values(
      GENDER,
    )}`,
  })
  @ApiProperty()
  second_student_gender: GENDER;

  @IsDateString({}, { message: 'The date of birth must be date type' })
  @IsNotEmpty()
  @ApiProperty({
    example: '2021-01-01',
  })
  second_student_DOB: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Tràng Lưu',
  })
  second_student_parish: string;

  @IsNotEmpty()
  @IsEnum(PARISH_CLUSTER, {
    message: `The type of parish cluster must be belonged to the enum ${Object.values(
      PARISH_CLUSTER,
    )}`,
  })
  @ApiProperty()
  second_parish_cluster: PARISH_CLUSTER;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Ha Tinh',
  })
  first_student_address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Huong Khe Ha Tinh',
  })
  second_student_address: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      if (value.toLowerCase() === 'true') {
        return true;
      }
      if (value.toLowerCase() === 'false') {
        return false;
      }
    }
    return value;
  })
  @IsBoolean({ message: 'The isAccept status must be in boolean type' })
  isAccept?: boolean = false;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  courseId?: number;
}

// export dto req for create marriages
// export class CreateMarriageReqDto {
//   @IsNotEmpty()
//   @IsInt()
//   @ApiProperty()
//   profileId: number;
//
//   @IsNotEmpty()
//   @IsInt()
//   @ApiProperty()
//   profilePartnerId: number;
//
//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty()
//   place: string;
//
//   @IsNotEmpty()
//   @IsDateString()
//   @ApiProperty()
//   date: string;
//
//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty()
//   priest: string;
//
//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty()
//   witness: string;
//
//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty()
//   note: string;
// }
