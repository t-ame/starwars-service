import { CommentDto, StatusDto } from '../interfaces';
export declare const CommentService: {
    /**
     * Add an anonymous comment
     *
     * @param movieId
     * @param comment
     *
     * @returns Promise<CommentDto>
     */
    addNewComment(movieId: string, comment: CommentDto): Promise<CommentDto>;
    /**
     * Get a comment
     *
     * @param movieId
     * @param commentId
     *
     * @returns Promise<CommentDto>
     */
    getCommentById(movieId: string, commentId: string): Promise<CommentDto>;
    /**
     * Get all movie comments
     *
     * @param movieId
     * @param start
     * @param length
     *
     * @returns Promise<CommentDto[]>
     */
    getMovieComments(movieId: string, start?: number, length?: number | undefined): Promise<{
        comments: CommentDto[];
        totalCount: number;
    }>;
    /**
     * Get all movie comments count
     *
     * @param movieId
     *
     * @returns Promise<number>
     */
    getMovieCommentsCount(movieId: string): Promise<number>;
    /**
     * Delete a comment
     *
     * @param commentId
     *
     * @returns Promise<CommentDto>
     */
    deleteCommentById(commentId: string): Promise<StatusDto>;
};
//# sourceMappingURL=CommentService.d.ts.map