"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore file */
const errorhandler_1 = __importDefault(require("errorhandler"));
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("../app"));
const typeorm_2 = __importDefault(require("../dbmanager/typeorm"));
const mysql_1 = require("../dbmanager/mysql");
const helpers_1 = require("../helpers");
app_1.default.use(errorhandler_1.default());
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mysql_1.autoCreateDb();
    yield typeorm_1.createConnection(typeorm_2.default)
        .then(() => {
        const port = process.env.PORT || 7000;
        // Initialize server
        const server = app_1.default.listen(port, () => {
            helpers_1.Logger.Info(`Service Started at http://localhost:${port}`);
            helpers_1.Logger.Info('Press CTRL+C to stop\n');
        });
        // Nodemon dev hack
        process.once('SIGUSR2', function () {
            server.close(function () {
                process.kill(process.pid, 'SIGUSR2');
            });
        });
    })
        .catch(error => {
        helpers_1.Logger.Error('(TypeORM) Database connection error: ', error);
    });
}))();
//# sourceMappingURL=index.js.map