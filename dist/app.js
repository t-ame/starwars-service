"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = express_1.default();
app.set('port', process.env.PORT);
app.set('env', process.env.NODE_ENV);
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
app.use(compression_1.default({
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            // don't compress responses with this request header
            return false;
        }
        // fallback to standard filter function
        return compression_1.default.filter(req, res);
    },
}));
app.disable('x-powered-by');
const router = express_1.default.Router();
router.use(routes_1.default);
app.use(router);
exports.default = app;
//# sourceMappingURL=app.js.map