import BlueBird from 'bluebird';
import { Movie } from '../models';
import { ErrorLog, HttpRequestHandler } from '../handlers';
import { IncomingMovieDto, MovieDto } from '../interfaces';
import { MovieMapper } from '../helpers';
import { CharacterService } from './CharacterService';
import { CommentService } from './CommentService';

export const MovieService = {
  /**
   * Get a movie
   *
   * @returns Promise<MovieDto>
   */
  async getMovieById(movieId: string): Promise<MovieDto> {
    try {
      let movieData = MovieMapper.mapMovieToDto(await Movie.findMovie(movieId));

      //Adding comment count and URLs to access this movie, its comments and characters
      movieData.commentCount = await CommentService.getMovieCommentsCount(movieId);
      movieData.comments = `/movies/${movieData.movieId}/comments`;
      movieData.characters = `/movies/${movieData.movieId}/characters`;
      movieData.url = `/movies/${movieData.movieId}`;

      return movieData;
    } catch (err) {
      throw {
        ...err,
      };
    }
  },
  /**
   * Get movie list
   *
   * @returns Promise<MovieDto[]>
   */
  async getAllMovies(): Promise<{ movies: MovieDto[]; totalCount: number }> {
    type MovieFetchResult = { data: { count: number; next: number | null; previous: number | null; results: IncomingMovieDto[] } };
    try {
      const movieList = <MovieFetchResult>await HttpRequestHandler.makeGetCall('https://swapi.dev/api/films/');

      let movies = await BlueBird.map(movieList.data.results, async movie => {
        const savedMovie = await Movie.addMovie(MovieMapper.mapIncomingToMovie(movie));
        const mov = savedMovie.movie;
        const commentCount = CommentService.getMovieCommentsCount(mov.movieId);

        if (savedMovie.newlySaved) {
          //Fetch movie characters and add to database
          const characters = movie.characters;
          CharacterService.fetchListOfMovieCharactersByUrl(mov.movieId, characters!).catch(err => ErrorLog.log(err));
        }

        let movieData = MovieMapper.mapMovieToDto(mov);

        //Adding comment count and URLs to access this movie, its comments and characters
        movieData.commentCount = await commentCount;
        movieData.comments = `/movies/${movieData.movieId}/comments`;
        movieData.characters = `/movies/${movieData.movieId}/characters`;
        movieData.url = `/movies/${movieData.movieId}`;

        return movieData;
      });
      movies.sort((a, b) => +new Date(a.releaseDate!) - +new Date(b.releaseDate!));

      return { movies, totalCount: movies.length };
    } catch (err) {
      throw {
        ...err,
      };
    }
  },
};
