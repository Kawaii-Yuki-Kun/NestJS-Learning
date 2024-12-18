import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionsFilter } from './database/all-excpetions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // Buffer logs until the app is fully initialized
  });

  const { httpAdapter } = app.get(HttpAdapterHost); // Get the HttpAdapter
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter)); // Use the AllExceptionsFilter for all routes)

  app.useLogger(app.get(MyLoggerService)); // Use the MyLoggerService for logging
  app.enableCors(); // Enable Cors for all routes
  app.setGlobalPrefix('api'); // Set global prefix for all routes
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
