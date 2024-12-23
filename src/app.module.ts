import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeBaseScheduleModule } from './employee-base-schedule/employee-base-schedule.module';
import { EmployeeTypeModule } from './employee-type/employee-type.module';
import { EmployeeWorkTypeModule } from './employee-work-type/employee-work-type.module';
import { WorkRequestModule } from './work-request/work-request.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

import { Notification } from './notification/notification.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [/*...*/],
      }),
      inject: [ConfigService],
    }),
    EmployeeModule,
    EmployeeBaseScheduleModule,
    EmployeeTypeModule,
    EmployeeWorkTypeModule,
    WorkRequestModule,
    UserModule,
    AuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService, Notification],
})
export class AppModule { }
