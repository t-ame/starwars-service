import { Request, Response } from 'express';

import { handleErrorResponse } from '../handlers';
import { Logger } from '../helpers';
import { CharacterService } from '../services';

export const CharacterController = {
  /**
   * Get a character in a movie
   *
   * @param req
   * @param res
   */
  async getCharacterById(req: Request, res: Response): Promise<void> {
    const { movieId, characterId } = req.params;
    try {
      const character = await CharacterService.getCharacterById(movieId, characterId);
      res.status(200).json(character);
    } catch (err) {
      handleErrorResponse(err, res);
    }
  },
  /**
   * Get list of all characters in a movie
   *
   * @param req
   * @param res
   */
  async getCharactersForMovie(req: Request, res: Response): Promise<void> {
    const { movieId } = req.params;
    const { filterGender, sortBy, sortDir } = req.query;
    try {
      const characters = await CharacterService.getMovieCharacters(movieId, sortBy, sortDir, filterGender);
      res.status(200).json(characters);
    } catch (err) {
      handleErrorResponse(err, res);
    }
  },
};
