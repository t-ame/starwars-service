import * as log4js from 'log4js';
import { ILogger, ILoggerOptions } from '../interfaces';
export declare class Log4js implements ILogger {
    logger: log4js.Logger;
    options: ILoggerOptions;
    constructor(options: ILoggerOptions);
    Info(...info: any): void;
    Error(...error: any): void;
    Warn(...message: any): void;
    Debug(...message: any): void;
    Trace(...message: any): void;
}
export declare class LoggerFactory {
    static configure(options: ILoggerOptions): ILogger;
}
//# sourceMappingURL=Logger.d.ts.map