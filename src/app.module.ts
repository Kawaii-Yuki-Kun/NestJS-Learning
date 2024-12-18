import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([
      {
        name: 'short', // Throttle requests with the name 'short'
        ttl: 1000, // 60 seconds
        limit: 3, // limit each IP to 3 requests per ttl
      },
      {
        name: 'long', // Throttle requests with the name 'long'
        ttl: 60000, // 60 seconds
        limit: 100, // limit each IP to 100 requests per ttl
      },
    ]),
    MyLoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD, // Apply ThrottlerGuard to all routes
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
