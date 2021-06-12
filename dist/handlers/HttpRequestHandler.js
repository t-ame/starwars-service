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
exports.HttpRequestHandler = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
const helpers_1 = require("../helpers");
exports.HttpRequestHandler = {
    /**
     * Make a GET request to an endpoint
     *
     * @returns Promise<any>
     */
    makeGetCall(endpoint, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(endpoint, {
                    params: parameters,
                });
                return response;
            }
            catch (error) {
                helpers_1.Logger.Error(error);
                throw {
                    code: constants_1.ErrorCode.SERVER_ERROR,
                    data: 'Error making request to endpoint',
                };
            }
        });
    },
    /**
     * Make a POST request to an endpoint
     *
     * @returns Promise<any>
     */
    makePostCall(endpoint, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(endpoint, data);
                return response;
            }
            catch (error) {
                helpers_1.Logger.Error(error);
                throw {
                    code: constants_1.ErrorCode.SERVER_ERROR,
                    data: 'Error making request to endpoint',
                };
            }
        });
    },
};
//# sourceMappingURL=HttpRequestHandler.js.map