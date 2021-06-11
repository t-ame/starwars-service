import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import BlueBird from 'bluebird';
import { ErrorCode } from '../constants';
import { cleanObj } from '../helpers/utility';
import { Character } from './Character';
import { Comment } from './Comment';

@Entity({ name: 'movies' })
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  movieId!: string;

  @Column()
  episodeId: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', length: 2000 })
  openingCrawl: string;

  @Column()
  director?: string;

  @Column()
  producer?: string;

  @Column({ type: 'timestamp' })
  releaseDate: Date;

  @Column()
  url?: string;

  @OneToMany(
    () => Character,
    character => character.movie,
    { cascade: true },
  )
  characters?: Character[];

  @OneToMany(
    () => Comment,
    comment => comment.movie,
    { cascade: true },
  )
  comments?: Comment[];

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;

  /**
   * Adds a movie
   *
   * @param movies
   */
  static async addMovie(movie: Movie): Promise<{ movie: Movie; newlySaved: boolean }> {
    try {
      const m = await Movie.findOne({ where: { episodeId: movie.episodeId } });
      return m ? { movie: m, newlySaved: false } : { movie: await Movie.create(movie).save(), newlySaved: true };
    } catch (err) {
      throw {
        code: ErrorCode.SERVER_ERROR,
        message: 'Typeorm error: Unable to add movie',
        data: err.stack,
      };
    }
  }

  /**
   * Adds a list of movies
   *
   * @param movies
   */
  static async addMovies(movies: Movie[]): Promise<Movie[]> {
    try {
      const savedMovies = await BlueBird.map(movies, async movie => {
        const m = await Movie.findOne({ where: { episodeId: movie.episodeId } });
        return m ? m : await Movie.create(movie).save();
      });
      return savedMovies;
    } catch (err) {
      throw {
        code: ErrorCode.SERVER_ERROR,
        message: 'Typeorm error: Unable to add movies',
        data: err.stack,
      };
    }
  }

  /**
   * Find a movie
   *
   * @param movieId
   * @param episodeId
   */
  static async findMovie(movieId?: string, episodeId?: number): Promise<Movie> {
    if (!movieId && !episodeId) {
      throw {
        code: ErrorCode.BAD_REQUEST,
        message: 'Movie ID or Episode ID is required.',
      };
    }
    try {
      const movie = await Movie.findOne({
        where: cleanObj({
          episodeId,
          movieId,
        }),
      });
      if (!movie) {
        throw {
          code: ErrorCode.RESOURCE_NOT_FOUND,
          message: 'Movie not found',
        };
      }
      return movie;
    } catch (err) {
      if (err.code) {
        throw err;
      }
      throw {
        code: ErrorCode.SERVER_ERROR,
        message: 'Typeorm error: Unable to get movie',
      };
    }
  }

  /**
   * Fetch all movies
   *
   * @param start
   * @param length
   */
  static async fetchAllMovies(start: number = 0, length?: number): Promise<{ movies: Movie[]; totalCount: number }> {
    try {
      const movies = await Movie.findAndCount({ order: { releaseDate: 'DESC' }, skip: start, take: length });

      return { movies: movies[0], totalCount: movies[1] };
    } catch (err) {
      throw {
        code: ErrorCode.SERVER_ERROR,
        message: 'Typeorm error: Unable to get movies',
      };
    }
  }
}
