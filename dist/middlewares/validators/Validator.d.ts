import { NextFunction, Request, Response } from 'express';
import { ContextRunner } from 'express-validator/src/chain';
/**
 * Uniform handling of express validators
 * @param validations
 */
export declare const Validator: {
    validate: (validations: ContextRunner[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=Validator.d.ts.map