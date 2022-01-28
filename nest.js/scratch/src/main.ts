import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './user/filter/filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform : true
    })
  );
  // app.use(Logger);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3002);
}
bootstrap();
