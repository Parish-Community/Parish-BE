import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import {
  AccountController,
  CourseController,
  ParishClusterController,
  PaymentsController,
  ParishionerController,
  RoleController,
  CloudinaryController,
  HouseHoldController,
  BaptismController,
} from './modules/controller';
import {
  AccountService,
  CourseService,
  ParishClusterService,
  PaymentsService,
  ParishionerService,
  RoleService,
  CloudinaryService,
  HouseHoldService,
  BaptismService,
} from './modules/service';
import {
  AccountModule,
  CourseModule,
  ParishClusterModule,
  PaymentsModule,
  ParishionerModule,
  RoleModule,
  CloudinaryModule,
  HouseHoldModule,
  BaptismModule,
} from './modules';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    ParishionerModule,
    RoleModule,
    ParishClusterModule,
    AccountModule,
    CourseModule,
    PaymentsModule,
    CloudinaryModule,
    HouseHoldModule,
    BaptismModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          port: configService.get<number>('EMAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_USER'),
            pass: configService.get<string>('EMAIL_PASS'),
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: process.cwd() + '/templates',
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  controllers: [
    ParishionerController,
    RoleController,
    ParishClusterController,
    AccountController,
    CourseController,
    PaymentsController,
    CloudinaryController,
    HouseHoldController,
    BaptismController,
  ],
  providers: [
    ParishionerService,
    RoleService,
    ParishClusterService,
    AccountService,
    CourseService,
    PaymentsService,
    CloudinaryService,
    HouseHoldService,
    BaptismService,
  ],
})
export class AppModule {}
