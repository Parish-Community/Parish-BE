import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { GetCourseResDto } from './dto/res';
import { ACCOUNT_ROLE } from '@/core/constants';
import { Auth } from '@/core/utils/decorator/auth.decorator';
import { GetAccount } from '@/core/utils/decorator/account.decorator';
import {
  AcceptRegisReqDto,
  CoupleRegisReqDto,
  CreateCourseReqDto,
  GetCourseQueriesDto,
  RejectRegisReqDto,
} from './dto/req';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('')
  async getCourses(
    @Query() queries: GetCourseQueriesDto,
  ): Promise<GetCourseResDto> {
    return await this.courseService.getCourses(queries);
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

  @Get('/couple-registration')
  @Auth(ACCOUNT_ROLE.ADM)
  async getCoupleRegistration(): Promise<GetCourseResDto> {
    return await this.courseService.getCoupleRegistration();
  }

  @Get('/couple-detail/:id')
  // @Auth(ACCOUNT_ROLE.USER)
  async getCoupleRegistrationDetail(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetCourseResDto> {
    return await this.courseService.getCoupleRegisDetail(id);
  }

  @Post('/couple-registration')
  @Auth(ACCOUNT_ROLE.USER)
  async coupleRegistration(
    @GetAccount() account,
    @Body() data: CoupleRegisReqDto,
  ): Promise<GetCourseResDto> {
    return await this.courseService.coupleRegistration(
      account.payload.parishionerId,
      data,
    );
  }

  @Patch('/couple-registration/:id/accept')
  @Auth(ACCOUNT_ROLE.ADM)
  async acceptCoupleRegistration(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: AcceptRegisReqDto,
  ): Promise<GetCourseResDto> {
    return await this.courseService.acceptCoupleRegistration(
      id,
      payload.courseId,
    );
  }

  @Patch('/couple-registration/:id/reject')
  @Auth(ACCOUNT_ROLE.ADM)
  async rejectCoupleRegistration(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: RejectRegisReqDto,
  ): Promise<GetCourseResDto> {
    return await this.courseService.rejectCoupleRegistration(
      id,
      payload.reason,
    );
  }
}
