
export interface IPositionInfo {
  "symbol": string,
  "positionAmt": string,
  "entryPrice": string,
  "markPrice": string,
  "unRealizedProfit": string,
  "liquidationPrice": string,
  "leverage": string,
  "maxNotionalValue": string,
  "marginType": string,
  "isolatedMargin": string,
  "isAutoAddMargin": string,
  "positionSide": string,
  "notional": string,
  "isolatedWallet": string,
  "updateTime": Date
}

export interface ICancelAllOrder {
  code: number,
  msg: string
}

export interface IOrder {
  "orderId": number,
  "symbol": string,
  "status": string,
  "clientOrderId": string,
  "price": string,
  "avgPrice": string,
  "origQty": string,
  "executedQty": string,
  "cumQty": string,
  "cumQuote": string,
  "timeInForce": string,
  "type": string,
  "reduceOnly": boolean,
  "closePosition": boolean,
  "side": string,
  "positionSide": string,
  "stopPrice": string,
  "workingType": string,
  "priceProtect": boolean,
  "origType": string,
  "updateTime": Date
}