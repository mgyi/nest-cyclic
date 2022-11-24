"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupertrendService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const api_1 = require("../utils/api");
const helper_1 = require("../utils/helper");
let SupertrendService = class SupertrendService {
    constructor(cfgSrv) {
        this.cfgSrv = cfgSrv;
        this.api = (0, api_1.getAxiosInstance)(this.cfgSrv.get('API_URL'), this.cfgSrv.get('API_KEY'));
    }
    async availableBalance() {
        const query = (0, helper_1.queryBuilder)();
        const { data } = await this.api.get(`fapi/v2/account?${query}`);
        return data.availableBalance;
    }
    async cancelAllOrder(symbol) {
        const query = (0, helper_1.queryBuilder)({ symbol });
        const { data } = await this.api.delete(`fapi/v1/allOpenOrders?${query}`);
        return data;
    }
    async position(symbol) {
        const query = (0, helper_1.queryBuilder)({ symbol });
        const { data } = await this.api.get(`fapi/v2/positionRisk?${query}`);
        return data;
    }
    async market(symbol, side, quantity, reduceOnly = false) {
        const query = (0, helper_1.queryBuilder)({ type: 'MARKET', symbol, side, quantity: Math.abs(quantity), reduceOnly });
        const { data } = await this.api.post(`fapi/v1/order?${query}`);
        return data;
    }
    async stopLoss(symbol, side, quantity, stopPrice) {
        const query = (0, helper_1.queryBuilder)({
            type: 'STOP_MARKET',
            symbol,
            side,
            quantity,
            stopPrice,
            reduceOnly: true
        });
        const { data } = await this.api.post(`fapi/v1/order?${query}`);
        return data;
    }
};
SupertrendService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SupertrendService);
exports.SupertrendService = SupertrendService;
//# sourceMappingURL=supertrend.service.js.map