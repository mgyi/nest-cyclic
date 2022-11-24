import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Parabaik Auto Bot');

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
  });
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(parseInt(process.env.PORT, 10) || 3000);
  logger.log(
    `Bot is start running on: ${await app.getUrl()}`,
  );
}
bootstrap();
