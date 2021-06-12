"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
__exportStar(require("./mappers"), exports);
__exportStar(require("./utility"), exports);
const Logger_1 = require("./Logger");
const Logger = Logger_1.LoggerFactory.configure({
    id: 'starwars',
    type: { type: 'file', filename: `logs/starwars_logs_${Date.now()}` },
    level: 'all',
});
exports.Logger = Logger;
//# sourceMappingURL=index.js.map