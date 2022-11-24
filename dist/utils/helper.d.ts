import { SIDES } from "./enums";
export declare const queryBuilder: (paramsObject?: {}) => string;
export declare const calcQuantity: (positionAmt: string, side: SIDES, quantity: number) => number;
