import { MovieDto } from '../interfaces';
export declare const MovieService: {
    /**
     * Get a movie
     *
     * @returns Promise<MovieDto>
     */
    getMovieById(movieId: string): Promise<MovieDto>;
    /**
     * Get movie list
     *
     * @returns Promise<MovieDto[]>
     */
    getAllMovies(): Promise<{
        movies: MovieDto[];
        totalCount: number;
    }>;
};
//# sourceMappingURL=MovieService.d.ts.map