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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupertrendController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const enums_1 = require("../utils/enums");
const dto_1 = require("./dto");
const supertrend_service_1 = require("./supertrend.service");
const logger_service_1 = require("../logger/logger.service");
let SupertrendController = class SupertrendController {
    constructor(srv, cfgSrv, logger) {
        this.srv = srv;
        this.cfgSrv = cfgSrv;
        this.logger = logger;
        this.logger.setContext('Supertrend');
    }
    async hook(webhookKey, { symbol, side, quantity, stopPrice }) {
        if (webhookKey !== this.cfgSrv.get('WEBHOOK_KEY')) {
            this.logger.error('Invalid Webhook Key');
            return 'Invalid Webhook Key';
        }
        const slSide = side === enums_1.SIDES.BUY ? enums_1.SIDES.SELL : enums_1.SIDES.BUY;
        const qty = parseFloat(quantity.toFixed(4));
        const sp = parseFloat(stopPrice.toFixed(2));
        try {
            const cancelRes = await this.srv.cancelAllOrder(symbol);
            this.logger.log('cancelRes', cancelRes);
            const positionRes = await this.srv.position(symbol);
            this.logger.log('positionRes', positionRes);
            const currentPAmount = parseFloat(positionRes[0].positionAmt);
            if (currentPAmount !== 0) {
                let tpSide = currentPAmount > 0 ? enums_1.SIDES.SELL : enums_1.SIDES.BUY;
                const tpRes = await this.srv.market(symbol, tpSide, Math.abs(currentPAmount));
                this.logger.log('tpRes', tpRes);
            }
            const marketRes = await this.srv.market(symbol, side, qty);
            this.logger.log('marketRes', marketRes);
            const stoplossRes = await this.srv.stopLoss(symbol, slSide, qty, sp);
            this.logger.log('stoplossRes', stoplossRes);
            return 'ok';
        }
        catch (error) {
            console.log('err', error);
        }
    }
};
__decorate([
    (0, common_1.Post)('hook/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.HookDto]),
    __metadata("design:returntype", Promise)
], SupertrendController.prototype, "hook", null);
SupertrendController = __decorate([
    (0, common_1.Controller)('supertrend'),
    __metadata("design:paramtypes", [supertrend_service_1.SupertrendService,
        config_1.ConfigService,
        logger_service_1.LoggerService])
], SupertrendController);
exports.SupertrendController = SupertrendController;
//# sourceMappingURL=supertrend.controller.js.map