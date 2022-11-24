import { ConfigService } from '@nestjs/config';
import { AxiosInstance } from 'axios';
import { SIDES } from 'src/utils/enums';
import { ICancelAllOrder, IOrder, IPositionInfo } from 'src/utils/interfaces';
export declare class SupertrendService {
    private readonly cfgSrv;
    api: AxiosInstance;
    constructor(cfgSrv: ConfigService);
    availableBalance(): Promise<number>;
    cancelAllOrder(symbol: string): Promise<ICancelAllOrder>;
    position(symbol: string): Promise<IPositionInfo[]>;
    market(symbol: string, side: SIDES, quantity: number): Promise<IOrder>;
    stopLoss(symbol: string, side: SIDES, quantity: number, stopPrice: number): Promise<IOrder>;
}
