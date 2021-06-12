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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = exports.handleRouteError = void 0;
const constants_1 = require("../constants");
const ErrorLog_1 = require("./ErrorLog");
/**
 * Handles undefined route errors
 * @param req Express request
 * @param res Express response
 */
function handleRouteError(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.status(404).json({
            errors: {
                message: 'Invalid route. See documentation; https://github.com/t-ame/starwars-service/blob/development/README.md',
                error: {
                    status: 404,
                },
            },
        });
    });
}
exports.handleRouteError = handleRouteError;
/**
 * Handles errors based on response codes.
 *
 * @param {Error} err    Custom error object
 * @param {Response} res Express response handler
 * @returns {Response}
 */
const handleErrorResponse = (err, res) => {
    const { message, code } = err;
    ErrorLog_1.ErrorLog.log(err);
    if (code === constants_1.ErrorCode.SERVER_ERROR || code === undefined) {
        return res.status(500).json({
            code: constants_1.ErrorCode.SERVER_ERROR,
            message: 'An unexpected internal server error occurred',
            data: err.stack,
        });
    }
    switch (code) {
        case constants_1.ErrorCode.FORBIDDEN:
            return res.status(403).json(Object.assign(Object.assign({}, err), { message: message || 'Unauthorized endpoint access' }));
        case constants_1.ErrorCode.BAD_REQUEST:
            return res.status(400).json(Object.assign(Object.assign({}, err), { message: message || 'Some important parameters are missing. See documentation' }));
        case constants_1.ErrorCode.REQUEST_FAILED:
            return res.status(503).json(err);
        case constants_1.ErrorCode.RESOURCE_NOT_FOUND:
            return res.status(404).json(err);
        default:
            return res.status(503).json(err);
    }
};
exports.handleErrorResponse = handleErrorResponse;
//# sourceMappingURL=RouteHandlers.js.map