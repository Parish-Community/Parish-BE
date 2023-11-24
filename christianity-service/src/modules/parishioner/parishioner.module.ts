import { Role } from '@/modules/role/role.entity';
import { Module } from '@nestjs/common';
import { ParishionerController } from './parishioner.controller';
import { ParishionerService } from './parishioner.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAILER_HOST_SERVICE'),
          service: 'gmail',
          port: 465,
          ignoreTLS: true,
          secure: true,
          debug: true,
          auth: {
            user: configService.get<string>('MAILER_AUTH_USER'),
            pass: configService.get<string>('MAILER_AUTH_PASS_APP'),
          },
        },
        defaults: {
          from: configService.get<string>('MAILER_HOST_SERVICE'),
        },
        template: {
          dir: './templates/',
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  controllers: [ParishionerController],
  providers: [ParishionerService],
  exports: [ParishionerService],
})
export class ParishionerModule {}
