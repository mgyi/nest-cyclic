"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupertrendModule = void 0;
const common_1 = require("@nestjs/common");
const supertrend_controller_1 = require("./supertrend.controller");
const supertrend_service_1 = require("./supertrend.service");
const logger_module_1 = require("../logger/logger.module");
let SupertrendModule = class SupertrendModule {
};
SupertrendModule = __decorate([
    (0, common_1.Module)({
        imports: [logger_module_1.LoggerModule],
        controllers: [supertrend_controller_1.SupertrendController],
        providers: [supertrend_service_1.SupertrendService]
    })
], SupertrendModule);
exports.SupertrendModule = SupertrendModule;
//# sourceMappingURL=supertrend.module.js.map