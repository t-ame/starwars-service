import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column } from 'typeorm';
import BlueBird from 'bluebird';
import { ErrorCode } from '../constants';
import { cleanObj } from '../helpers/utility';
import { Movie } from './Movie';

@Entity({ name: 'characters' })
export class Character extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  characterId!: string;

  @Column()
  name: string;

  @Column()
  height: number;

  @Column()
  mass: string;

  @Column()
  hairColor: string;

  @Column()
  skinColor: string;

  @Column()
  eyeColor: string;

  @Column()
  birthYear: string;

  @Column()
  gender: string;

  @Column()
  homeWorld: string;

  @Column()
  url?: string;

  @ManyToOne(
    () => Movie,
    movie => movie.characters,
    { eager: true },
  )
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;

  /**
   * Adds a movie character
   *
   * @param movieId
   * @param character
   */
  static async addMovieCharacter(movieId: string, character: Character): Promise<Character> {
    try {
      const c = {
        ...character,
        movie: { movieId },
      };
      return await Character.create(c).save();
    } catch (err) {
      throw {
        code: ErrorCode.SERVER_ERROR,
        message: 'Typeorm error: Unable to add character',
        data: err.stack,
      };
    }
  }

  /**
   * Find a character
   *
   * @param characterId
   */
  static async findCharacter(movieId: string, characterId: string): Promise<Character> {
    try {
      const character = await Character.findOne({
        where: cleanObj({
          movie: { movieId },
          characterId,
        }),
      });
      if (!character) {
        throw {
          code: ErrorCode.RESOURCE_NOT_FOUND,
          message: 'Character not found',
        };
      }
      return character;
    } catch (err) {
      if (err.code) {
        throw err;
      }
      throw {
        code: ErrorCode.SERVER_ERROR,
        message: 'Typeorm error: Unable to get character',
      };
    }
  }

  /**
   * Fetch all movie characters
   *
   * @param movieId
   * @param orderBy
   * @param orderDirection
   * @param filterGender
   * @param start
   * @param length
   */
  static async fetchMovieCharacters(
    movieId: string,
    orderBy: 'name' | 'height',
    orderDirection: 'ASC' | 'DESC',
    filterGender?: string,
    start?: number,
    length?: number,
  ): Promise<{ characters: Character[]; totalCount: number }> {
    try {
      const characters = await Character.findAndCount({
        where: cleanObj({
          movie: { movieId },
          gender: filterGender,
        }),
        order: { [orderBy]: orderDirection },
        skip: start,
        take: length,
      });

      return { characters: characters[0], totalCount: characters[1] };
    } catch (err) {
      throw {
        code: ErrorCode.SERVER_ERROR,
        message: 'Typeorm error: Unable to get characters',
      };
    }
  }
}
