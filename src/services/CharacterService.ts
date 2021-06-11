import BlueBird from 'bluebird';
import { Character } from '../models';
import { HttpRequestHandler } from '../handlers';
import { CharacterDto, IncomingCharacterDto } from '../interfaces';
import { CharacterMapper } from '../helpers';

type CharacterList = {
  characters: CharacterDto[];
  totalCount: number;
  totalHeightCm: number;
  totalheightFtIn: string;
};

export const CharacterService = {
  /**
   * Get a movie character from external URL
   *
   * @param movieId
   * @param url
   *
   * @returns Promise<CharacterDto>
   */
  async fetchMovieCharacterByUrl(movieId: string, url: string): Promise<CharacterDto> {
    try {
      const characterData = <{ data: IncomingCharacterDto }>await HttpRequestHandler.makeGetCall(url);
      const character = await Character.addMovieCharacter(movieId, CharacterMapper.mapIncomingToCharacter(characterData.data));
      return character;
    } catch (err) {
      throw {
        ...err,
      };
    }
  },
  /**
   * Get a movie character from external URL
   *
   * @param movieId
   * @param url
   *
   * @returns Promise<CharacterDto>
   */
  async fetchListOfMovieCharactersByUrl(movieId: string, urls: string[]): Promise<CharacterDto[]> {
    try {
      return await BlueBird.map(urls, async url => {
        return await this.fetchMovieCharacterByUrl(movieId, url);
      });
    } catch (err) {
      throw {
        ...err,
      };
    }
  },
  /**
   * Get a character
   *
   * @param characterId
   *
   * @returns Promise<CharacterDto>
   */
  async getCharacterById(movieId: string, characterId: string): Promise<CharacterDto> {
    try {
      let charDto = CharacterMapper.mapCharacterToDto(await Character.findCharacter(movieId, characterId));
      charDto.url = `/movies/${movieId}/characters/${charDto.characterId}`;
      return charDto;
    } catch (err) {
      throw {
        ...err,
      };
    }
  },
  /**
   * Get all movie characters
   *
   * @param movieId
   * @param sortBy
   * @param sortDir
   * @param filterGender
   * @param start
   * @param length
   *
   * @returns Promise<CharacterDto[]>
   */
  async getMovieCharacters(
    movieId: string,
    sortBy?: string,
    sortDir?: string,
    filterGender?: string,
    start: number = 0,
    length?: number,
  ): Promise<CharacterList> {
    if (sortBy !== 'name' && sortBy !== 'height') {
      sortBy = 'name';
      sortDir = 'ASC';
    }
    if (sortDir !== 'ASC' && sortDir !== 'DESC') {
      sortDir = 'ASC';
    }
    try {
      const characterList = await Character.fetchMovieCharacters(
        movieId,
        <'name' | 'height'>sortBy,
        <'ASC' | 'DESC'>sortDir,
        filterGender,
        start,
        length,
      );
      const characters = characterList.characters;
      let totalHeightCm = 0;
      for (let i = 0; i < characters.length; ++i) {
        totalHeightCm += characters[i].height;
      }
      const d = totalHeightCm / 2.54;
      const totalHeightFt = Math.floor(d / 12);
      const totalheightIn = (d % 12).toFixed(2);

      const totalheightFtIn = `${totalHeightFt}ft and ${totalheightIn}inches`;

      const c = characters.map(char => {
        let charDto = CharacterMapper.mapCharacterToDto(char);
        charDto.url = `/movies/${movieId}/characters/${charDto.characterId}`;
        return charDto;
      });

      return {
        characters: c,
        totalCount: characterList.totalCount,
        totalHeightCm,
        totalheightFtIn,
      };
    } catch (err) {
      throw {
        ...err,
      };
    }
  },
};
