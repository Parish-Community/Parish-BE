import {
  COURSE_STATUS,
  GENDER,
  PARISH_CLUSTER,
  POSITION_PARISH,
} from '@/core/constants';
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

export class CreateCourseReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  courseName: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2023-06-01',
  })
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2023-09-30',
  })
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  profileId: number;

  @IsNotEmpty()
  @IsEnum(COURSE_STATUS, {
    message: `The type of course status must be belonged to the enum ${Object.values(
      COURSE_STATUS,
    )}`,
  })
  @ApiProperty({
    example: COURSE_STATUS.OPEN,
  })
  courseStatus: COURSE_STATUS;
}

export class GetCourseQueriesDto {
  @IsOptional()
  @IsEnum(COURSE_STATUS, {
    message: `The type of course status must be belonged to the enum ${Object.values(
      COURSE_STATUS,
    )}`,
  })
  @ApiProperty({
    required: false,
    example: COURSE_STATUS.OPEN,
  })
  courseStatus?: COURSE_STATUS;
}

export class UpdateCourseReqDto extends PartialType(CreateCourseReqDto) {}

export class CoupleRegisReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  partner2_christianName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  partner2_fullname: string;

  @IsNotEmpty()
  @IsEnum(GENDER, {
    message: `The type of gender must be belonged to the enum ${Object.values(
      GENDER,
    )}`,
  })
  @ApiProperty()
  gender?: GENDER;
  partner2_gender: GENDER;

  @IsOptional()
  @IsString({ message: 'The phone number must be string' })
  @MinLength(10)
  @MaxLength(10)
  @IsNotEmpty()
  @ApiProperty()
  partner2_phonenumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  partner2_dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  partner2_name_father: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  partner2_name_mother: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  partner2_address: string;

  @IsNotEmpty({ message: 'The parish_clusterId is required' })
  @IsInt()
  @ApiProperty()
  parish_clusterId: number;
}

export class AcceptRegisReqDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  courseId: number;
}

export class RejectRegisReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  reason: string;
}
