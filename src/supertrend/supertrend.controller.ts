import { Body, Controller, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SIDES } from 'src/utils/enums';
import { HookDto } from './dto';
import { SupertrendService } from './supertrend.service';
import { LoggerService } from '../logger/logger.service';

@Controller('supertrend')
export class SupertrendController {
  constructor(
    private readonly srv: SupertrendService, 
    private readonly cfgSrv: ConfigService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('Supertrend');
  }

  @Post('hook/:id')
  async hook(@Param('id') webhookKey: string, @Body() { symbol, side, quantity, stopPrice }: HookDto) {
    if (webhookKey !== this.cfgSrv.get('WEBHOOK_KEY')) {
      this.logger.error('Invalid Webhook Key');
      return 'Invalid Webhook Key'
    }
    
    const slSide = side === SIDES.BUY ? SIDES.SELL: SIDES.BUY;
    const qty =  parseFloat(quantity.toFixed(2));
    try {
      const cancelRes = await this.srv.cancelAllOrder(symbol);
      this.logger.log('cancelRes',cancelRes);

      const positionRes = await this.srv.position(symbol);
      this.logger.log('positionRes',positionRes);

      const currentPAmount = parseFloat(positionRes[0].positionAmt);

      if(currentPAmount !== 0) {
        let tpSide = currentPAmount > 0 ? SIDES.SELL: SIDES.BUY;
        const tpRes = await this.srv.market(symbol, tpSide, Math.abs(currentPAmount), true);
        this.logger.log('tpRes',tpRes);
      }

      const marketRes = await this.srv.market(symbol, side, qty);
      this.logger.log('marketRes',marketRes);


      const stoplossRes = await this.srv.stopLoss(symbol, slSide, qty, stopPrice);
      this.logger.log('stoplossRes',stoplossRes);

      return 'ok';
  
    } catch (error) {
      console.log('err',error)
    }
  }
}
