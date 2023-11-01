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
