import { Request, Response } from 'express';
export declare const CommentController: {
    /**
     * Get list of all commnets in a movie
     *
     * @param req
     * @param res
     */
    getAllCommentsForMovie(req: Request, res: Response): Promise<void>;
    /**
     * Get comment in a movie by ID
     *
     * @param req
     * @param res
     */
    getCommentById(req: Request, res: Response): Promise<void>;
    /**
     * Add a new anonymous comment to a movie
     *
     * @param req
     * @param res
     */
    addCommentToMovie(req: Request, res: Response): Promise<void>;
    /**
     * Delete a comment by ID
     *
     * @param req
     * @param res
     */
    deleteCommentById(req: Request, res: Response): Promise<void>;
};
//# sourceMappingURL=CommentController.d.ts.map