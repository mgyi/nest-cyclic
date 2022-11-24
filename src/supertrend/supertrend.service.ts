import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosInstance } from 'axios';
import { getAxiosInstance } from 'src/utils/api';
import { SIDES } from 'src/utils/enums';
import { queryBuilder } from 'src/utils/helper';
import { ICancelAllOrder, IOrder, IPositionInfo } from 'src/utils/interfaces';

@Injectable()
export class SupertrendService {
  api: AxiosInstance;
  
  constructor(private readonly cfgSrv: ConfigService) {
    this.api = getAxiosInstance(this.cfgSrv.get('API_URL'), this.cfgSrv.get('API_KEY'))
  }

  async availableBalance() : Promise<number> {
    const query = queryBuilder();
    const { data } = await this.api.get<{availableBalance: number}>(`fapi/v2/account?${query}`)
    return data.availableBalance;
  }

  async cancelAllOrder(symbol: string): Promise<ICancelAllOrder> {
    const query = queryBuilder({ symbol });
    const { data } = await this.api.delete<ICancelAllOrder>(`fapi/v1/allOpenOrders?${query}`)
    return data;
  }

  async position(symbol: string) {
    const query = queryBuilder({ symbol });
    const { data } = await this.api.get<Array<IPositionInfo>>(`fapi/v2/positionRisk?${query}`)
    return data;
  }

  async market(symbol: string, side: SIDES, quantity: number): Promise<IOrder> {
    const query = queryBuilder({ type: 'MARKET', symbol, side, quantity: Math.abs(quantity) });
    const { data } = await this.api.post<IOrder>(`fapi/v1/order?${query}`)
    return data;
  }

  async stopLoss(symbol: string, side: SIDES, quantity: number, stopPrice: number) :Promise<IOrder> {
    const query = queryBuilder({
      type: 'STOP_MARKET', 
      symbol, 
      side, 
      quantity, 
      stopPrice,
    });
    const { data } = await this.api.post<IOrder>(`fapi/v1/order?${query}`)
    return data;
  }
}
