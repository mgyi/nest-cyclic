import { Module } from '@nestjs/common';
import { SupertrendController } from './supertrend.controller';
import { SupertrendService } from './supertrend.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [SupertrendController],
  providers: [SupertrendService]
})
export class SupertrendModule {}
