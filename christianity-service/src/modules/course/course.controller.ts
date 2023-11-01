import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { GetCourseResDto } from './dto/res';
import { ACCOUNT_ROLE } from '@/core/constants';
import { Auth } from '@/core/utils/decorator/auth.decorator';
import { GetAccount } from '@/core/utils/decorator/account.decorator';
import { CreateCourseReqDto } from './dto/req';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('')
  async getCourses(): Promise<GetCourseResDto> {
    return await this.courseService.getCourses();
  }

  @Post('')
  @Auth(ACCOUNT_ROLE.ADM)
  async createCourse(
    @GetAccount() account,
    @Body() data: CreateCourseReqDto,
  ): Promise<GetCourseResDto> {
    return await this.courseService.createCourse(
      account.payload.accountId,
      data,
    );
  }
}
