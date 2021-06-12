import { BaseEntity } from 'typeorm';
import { Character } from './Character';
import { Comment } from './Comment';
export declare class Movie extends BaseEntity {
    movieId: string;
    episodeId: number;
    name: string;
    openingCrawl: string;
    director?: string;
    producer?: string;
    releaseDate: Date;
    url?: string;
    characters?: Character[];
    comments?: Comment[];
    createdAt: Date;
    updatedAt: Date;
    /**
     * Adds a movie
     *
     * @param movies
     */
    static addMovie(movie: Movie): Promise<{
        movie: Movie;
        newlySaved: boolean;
    }>;
    /**
     * Adds a list of movies
     *
     * @param movies
     */
    static addMovies(movies: Movie[]): Promise<Movie[]>;
    /**
     * Find a movie
     *
     * @param movieId
     * @param episodeId
     */
    static findMovie(movieId?: string, episodeId?: number): Promise<Movie>;
    /**
     * Fetch all movies
     *
     * @param start
     * @param length
     */
    static fetchAllMovies(start?: number, length?: number): Promise<{
        movies: Movie[];
        totalCount: number;
    }>;
}
//# sourceMappingURL=Movie.d.ts.map