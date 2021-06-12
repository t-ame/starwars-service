import { Request, Response } from 'express';
import { IErrorObject } from '../interfaces';
/**
 * Handles undefined route errors
 * @param req Express request
 * @param res Express response
 */
export declare function handleRouteError(req: Request, res: Response): Promise<Response>;
/**
 * Handles errors based on response codes.
 *
 * @param {Error} err    Custom error object
 * @param {Response} res Express response handler
 * @returns {Response}
 */
export declare const handleErrorResponse: (err: IErrorObject, res: Response) => Response;
//# sourceMappingURL=RouteHandlers.d.ts.map