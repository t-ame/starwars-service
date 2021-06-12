import { Request, Response } from 'express';
export declare const CharacterController: {
    /**
     * Get a character in a movie
     *
     * @param req
     * @param res
     */
    getCharacterById(req: Request, res: Response): Promise<void>;
    /**
     * Get list of all characters in a movie
     *
     * @param req
     * @param res
     */
    getCharactersForMovie(req: Request, res: Response): Promise<void>;
};
//# sourceMappingURL=CharacterController.d.ts.map