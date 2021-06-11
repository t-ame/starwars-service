import { Comment } from '../models';
import { CommentDto, StatusDto } from '../interfaces';
import { CommentMapper, Logger } from '../helpers';

export const CommentService = {
  /**
   * Add an anonymous comment
   *
   * @param movieId
   * @param comment
   *
   * @returns Promise<CommentDto>
   */
  async addNewComment(movieId: string, comment: CommentDto): Promise<CommentDto> {
    try {
      const newComment = await Comment.addComment(movieId, CommentMapper.mapDtoToComment(comment));
      let comm = CommentMapper.mapCommentToDto(newComment);
      comm.url = `/movies/${movieId}/comments/${comm.commentId}`;

      Logger.Info(`New comment added to movie: ${movieId}, Commenter IP Address: ${comment.ipAddress}`);

      return comm;
    } catch (err) {
      throw {
        ...err,
      };
    }
  },
  /**
   * Get a comment
   *
   * @param movieId
   * @param commentId
   *
   * @returns Promise<CommentDto>
   */
  async getCommentById(movieId: string, commentId: string): Promise<CommentDto> {
    try {
      let comment = CommentMapper.mapCommentToDto(await Comment.findComment(movieId, commentId));
      comment.url = `/movies/${movieId}/comments/${comment.commentId}`;
      return comment;
    } catch (err) {
      throw {
        ...err,
      };
    }
  },
  /**
   * Get all movie comments
   *
   * @param movieId
   * @param start
   * @param length
   *
   * @returns Promise<CommentDto[]>
   */
  async getMovieComments(movieId: string, start: number = 0, length?: number): Promise<{ comments: CommentDto[]; totalCount: number }> {
    try {
      const commentList = await Comment.fetchMovieComments(movieId, start, length);
      const comments = commentList.comments.map(comment => {
        let comm = CommentMapper.mapCommentToDto(comment);
        comm.url = `/movies/${movieId}/comments/${comm.commentId}`;
        return comm;
      });

      return {
        comments,
        totalCount: commentList.totalCount,
      };
    } catch (err) {
      throw {
        ...err,
      };
    }
  },
  /**
   * Get all movie comments count
   *
   * @param movieId
   *
   * @returns Promise<number>
   */
  async getMovieCommentsCount(movieId: string): Promise<number> {
    try {
      const commentList = await Comment.fetchMovieComments(movieId);
      return commentList.totalCount;
    } catch (err) {
      throw {
        ...err,
      };
    }
  },
  /**
   * Delete a comment
   *
   * @param commentId
   *
   * @returns Promise<CommentDto>
   */
  async deleteCommentById(commentId: string): Promise<StatusDto> {
    try {
      await Comment.deleteComment(commentId);
      return {
        success: true,
        message: 'comment deleted successfully.',
      };
    } catch (err) {
      throw {
        ...err,
      };
    }
  },
};
