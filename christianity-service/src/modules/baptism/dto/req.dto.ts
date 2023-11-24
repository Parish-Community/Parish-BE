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
import { PaginationReqDto } from '@/core/common/pagination.dto';

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

export class GetProfilesReqDto extends PaginationReqDto {
  @IsOptional()
  @IsString({ message: 'The search text must be a string' })
  searchText: string;
}

export class UpdateBaptismReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  priestBaptism: string;

  @IsNotEmpty()
  @IsDateString({}, { message: 'The date of birth must be date type' })
  @ApiProperty({
    example: '2021-01-01',
  })
  dateBaptism?: Date;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  parish_clusterId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  regisname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  christianName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}

export class FileImportDataReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  priestBaptism: string;

  @IsNotEmpty()
  @IsDateString({}, { message: 'The date of birth must be date type' })
  @ApiProperty({
    example: '2021-01-01',
  })
  dateBaptism?: Date;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  parishionerId: number;

  @IsNotEmpty({ message: 'The parish_clusterId is required' })
  @IsInt()
  @ApiProperty()
  parish_clusterId: number;
}

export class CronDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number, required: false })
  seconds?: number;
}
