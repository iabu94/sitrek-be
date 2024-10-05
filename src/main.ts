import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  const globalPrefix = 'api';
  const port = 3000;
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: 'http://localhost:4200',
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
