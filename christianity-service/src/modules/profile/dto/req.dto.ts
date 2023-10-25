import { GENDER } from '@/core/constants';
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
  fullname!: string;
  christianName!: string;
  gender!: GENDER;
  dateOfBirth!: Date;
  name_father!: string;
  name_mother!: string;
  god_parent!: string;
  phonenumber!: string;
  avatar!: string;
  address!: string;
  diocese!: string;
  parish!: string;
  parish_clusterId!: number;
}

export class UpdateProfileReqDto {
  fullname!: string;
  christianName!: string;
  gender!: GENDER;
  dateOfBirth!: Date;
  name_father!: string;
  name_mother!: string;
  god_parent!: string;
  phonenumber!: string;
  avatar!: string;
  address!: string;
  diocese!: string;
  parish!: string;
  parish_clusterId!: number;
}
