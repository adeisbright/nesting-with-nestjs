import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './CustomExceptionFilter';
import { GlobalLoggerMiddleware } from './logger-functional.middleware';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    { abortOnError: false }
  );
  app.use(GlobalLoggerMiddleware)
  //app.useGlobalFilters(new HttpExceptionFilter()) // Global Scoped Filter
  await app.listen(3000);
}
bootstrap();
