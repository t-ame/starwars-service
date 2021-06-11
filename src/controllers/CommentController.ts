import { Request, Response } from 'express';

import { handleErrorResponse } from '../handlers';
import { CommentDto } from '../interfaces';
import { CommentService } from '../services';

export const CommentController = {
  /**
   * Get list of all commnets in a movie
   *
   * @param req
   * @param res
   */
  async getAllCommentsForMovie(req: Request, res: Response): Promise<void> {
    const { movieId } = req.params;
    try {
      const comments = await CommentService.getMovieComments(movieId!);
      res.status(200).json(comments);
    } catch (err) {
      handleErrorResponse(err, res);
    }
  },
  /**
   * Get comment in a movie by ID
   *
   * @param req
   * @param res
   */
  async getCommentById(req: Request, res: Response): Promise<void> {
    const { movieId, commentId } = req.params;
    try {
      const comments = await CommentService.getCommentById(movieId!, commentId!);
      res.status(200).json(comments);
    } catch (err) {
      handleErrorResponse(err, res);
    }
  },
  /**
   * Add a new anonymous comment to a movie
   *
   * @param req
   * @param res
   */
  async addCommentToMovie(req: Request, res: Response): Promise<void> {
    const { movieId } = req.params;
    const comment = <CommentDto>req.body;

    const xfx = req.headers['x-forwarded-for'];
    comment.ipAddress = (xfx ? xfx[0] : undefined) || req.connection.remoteAddress;

    try {
      const newComment = await CommentService.addNewComment(movieId!, comment);
      res.status(200).json(newComment);
    } catch (err) {
      handleErrorResponse(err, res);
    }
  },
  /**
   * Delete a comment by ID
   *
   * @param req
   * @param res
   */
  async deleteCommentById(req: Request, res: Response): Promise<void> {
    const { commentId } = req.params;
    try {
      const status = await CommentService.deleteCommentById(commentId!);
      res.status(200).json(status);
    } catch (err) {
      handleErrorResponse(err, res);
    }
  },
};
