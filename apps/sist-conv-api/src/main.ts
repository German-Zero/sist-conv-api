/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import 'reflect-metadata'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.MI_DOMINIO,
    ],
    credentials: true,
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useLogger(['error', 'warn', 'log'])
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Application Running.`);
}

bootstrap();
