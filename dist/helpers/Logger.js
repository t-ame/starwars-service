"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFactory = exports.Log4js = void 0;
const log4js = __importStar(require("log4js"));
class Log4js {
    constructor(options) {
        this.options = options;
        log4js.configure({
            appenders: {
                [options.id]: {
                    type: options.type.type || 'console',
                    layout: { type: 'colored' },
                    filename: options.type.filename,
                },
            },
            categories: {
                default: { appenders: [options.id], level: options.level || 'error' },
            },
        });
        this.logger = log4js.getLogger(options.id);
    }
    Info(...info) {
        this.logger.info(info);
    }
    Error(...error) {
        this.logger.error(error);
    }
    Warn(...message) {
        this.logger.warn(message);
    }
    Debug(...message) {
        this.logger.debug(message);
    }
    Trace(...message) {
        this.logger.trace(message);
    }
}
exports.Log4js = Log4js;
class LoggerFactory {
    static configure(options) {
        return new Log4js(options);
    }
}
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=Logger.js.map