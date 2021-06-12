import { BaseEntity } from 'typeorm';
import { Movie } from './Movie';
export declare class Comment extends BaseEntity {
    commentId: string;
    comment: string;
    ipAddress: string;
    movie: Movie;
    createdAt: Date;
    updatedAt: Date;
    /**
     * Adds an anonymous comment
     *
     * @param movieId
     * @param comment
     */
    static addComment(movieId: string, comment: Comment): Promise<Comment>;
    /**
     * Find a character
     *
     * @param commentId
     */
    static findComment(movieId: string, commentId: string): Promise<Comment>;
    /**
     * Fetch all movie comments
     *
     * @param movieId
     * @param start
     * @param length
     */
    static fetchMovieComments(movieId: string, start?: number, length?: number): Promise<{
        comments: Comment[];
        totalCount: number;
    }>;
    /**
     * Delete a movie comment
     *
     * @param comment
     */
    static deleteComment(commentId: string): Promise<boolean>;
}
//# sourceMappingURL=Comment.d.ts.map