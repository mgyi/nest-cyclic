import { ConfigService } from '@nestjs/config';
import { HookDto } from './dto';
import { SupertrendService } from './supertrend.service';
import { LoggerService } from '../logger/logger.service';
export declare class SupertrendController {
    private readonly srv;
    private readonly cfgSrv;
    private readonly logger;
    constructor(srv: SupertrendService, cfgSrv: ConfigService, logger: LoggerService);
    hook(webhookKey: string, { symbol, side, quantity, stopPrice }: HookDto): Promise<"Invalid Webhook Key" | "ok">;
}
