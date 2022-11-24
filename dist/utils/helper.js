"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcQuantity = exports.queryBuilder = void 0;
const enums_1 = require("./enums");
var CryptoJS = require("crypto-js");
const queryBuilder = (paramsObject = {}) => {
    Object.assign(paramsObject, { 'timestamp': Date.now() });
    const queryString = Object.keys(paramsObject).map((key) => {
        return `${encodeURIComponent(key)}=${paramsObject[key]}`;
    }).join('&');
    const signature = CryptoJS.HmacSHA256(queryString, process.env.API_SECRET).toString();
    return `${queryString}&signature=${signature}`;
};
exports.queryBuilder = queryBuilder;
const calcQuantity = (positionAmt, side, quantity) => {
    const currentAmount = parseFloat(positionAmt);
    if (currentAmount === 0)
        return quantity;
    let currentPositionSide = currentAmount > 0 ? enums_1.SIDES.BUY : enums_1.SIDES.SELL;
    return currentPositionSide === side ? quantity : Math.abs(currentAmount) + quantity;
};
exports.calcQuantity = calcQuantity;
//# sourceMappingURL=helper.js.map