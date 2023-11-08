import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class FileUploadReqDto {
  @IsString()
  @IsNotEmpty()
  houseHoldCode: string;

  @IsInt()
  @IsNotEmpty()
  parish_clusterId: number;

  @IsString()
  @IsNotEmpty()
  address: string;
}
