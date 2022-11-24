import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { SupertrendModule } from './supertrend/supertrend.module';
import * as Joi from '@hapi/joi';
import LogsMiddleware from './middlewares/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().port().required(),

        API_URL: Joi.string().required(),
        API_KEY: Joi.string().required(),
        API_SECRET: Joi.string().required(),
        WEBHOOK_KEY: Joi.string().required()
      })
    }),
    SupertrendModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .forRoutes('*');
  }
}
