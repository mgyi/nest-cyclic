"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = new common_1.Logger('Parabaik Auto Bot');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log', 'warn', 'error'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(parseInt(process.env.PORT, 10) || 3000);
    logger.log(`Bot is start running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map