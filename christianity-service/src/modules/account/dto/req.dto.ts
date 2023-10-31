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

export class CreateAccountReqDto {
  @IsNotEmpty({ message: 'The phone number is required' })
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @ApiProperty()
  readonly phonenumber: string;

  @IsNotEmpty({ message: 'The fullname is required' })
  @IsString()
  @ApiProperty()
  readonly fullname: string;

  @IsNotEmpty({ message: 'The email is required' })
  @IsString()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty({ message: 'The password is required' })
  @IsString()
  @MinLength(8)
  @MaxLength(12)
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty({ message: 'The roleId is required' })
  @IsInt()
  @ApiProperty({ example: 2 })
  readonly roleId: number;
}

export class SigninReqDto {
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

export class RegisterReqDto {
  email: string;
  password: string;
  phonenumber: string;
  confirmPassword: string;
  fullname: string;
}
