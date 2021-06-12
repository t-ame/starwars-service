"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const handlers_1 = require("../handlers");
const movies_1 = __importDefault(require("./movies"));
const characters_1 = __importDefault(require("./characters"));
const comments_1 = __importDefault(require("./comments"));
const router = express_1.default.Router();
router.use(cors_1.default());
router.use('/movies', movies_1.default);
router.use('/movies', characters_1.default);
router.use('/movies', comments_1.default);
router.use('/health', (req, res) => {
    res.send({ status: 'OK' });
});
router.use(handlers_1.handleRouteError);
exports.default = router;
//# sourceMappingURL=index.js.map