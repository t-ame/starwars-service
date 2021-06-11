import { Request, Response } from 'express';

import { handleErrorResponse } from '../handlers';
import { MovieService } from '../services';

export const MovieController = {
  /**
   * Get a movie
   *
   * @param req
   * @param res
   */
  async getMovieById(req: Request, res: Response): Promise<void> {
    const { movieId } = req.params;
    try {
      const movie = await MovieService.getMovieById(movieId);
      res.status(200).json(movie);
    } catch (err) {
      handleErrorResponse(err, res);
    }
  },
  /**
   * Get list of all Star Wars movies
   *
   * @param req
   * @param res
   */
  async getAllMovies(req: Request, res: Response): Promise<void> {
    try {
      const movies = await MovieService.getAllMovies();
      res.status(200).json(movies);
    } catch (err) {
      handleErrorResponse(err, res);
    }
  },
};
