"use strict";
/* istanbul ignore file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLog = void 0;
const helpers_1 = require("../helpers");
exports.ErrorLog = {
    /**
     * Log an error
     * @param err
     */
    log(err) {
        'string' === typeof err ? helpers_1.Logger.Error('SERVER_ERROR: ', err) : helpers_1.Logger.Error('SERVER_ERROR: ', err);
    },
};
//# sourceMappingURL=ErrorLog.js.map