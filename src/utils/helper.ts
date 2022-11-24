import { SIDES } from "./enums";

var CryptoJS = require("crypto-js");

export const queryBuilder = (paramsObject = {}) => {
  Object.assign(paramsObject, {'timestamp': Date.now()});

  const queryString = Object.keys(paramsObject).map((key) => {
    return `${encodeURIComponent(key)}=${paramsObject[key]}`;
  }).join('&');

  const signature = CryptoJS.HmacSHA256(queryString, process.env.API_SECRET).toString();
  return `${queryString}&signature=${signature}`;
}


// 1.5 > 0 = BUY || SELL
// BUY == BUY ? (ignore prev) : (+) 

export const calcQuantity = (positionAmt: string, side: SIDES, quantity: number): number => {
  const currentAmount = parseFloat(positionAmt);
  if (currentAmount === 0) return quantity;
  
  let currentPositionSide = currentAmount > 0 ? SIDES.BUY: SIDES.SELL;
  return currentPositionSide === side ? quantity : Math.abs(currentAmount) + quantity;
}