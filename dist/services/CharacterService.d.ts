import { CharacterDto } from '../interfaces';
declare type CharacterList = {
    characters: CharacterDto[];
    totalCount: number;
    totalHeightCm: number;
    totalheightFtIn: string;
};
export declare const CharacterService: {
    /**
     * Get a movie character from external URL
     *
     * @param movieId
     * @param url
     *
     * @returns Promise<CharacterDto>
     */
    fetchMovieCharacterByUrl(movieId: string, url: string): Promise<CharacterDto>;
    /**
     * Get a movie character from external URL
     *
     * @param movieId
     * @param url
     *
     * @returns Promise<CharacterDto>
     */
    fetchListOfMovieCharactersByUrl(movieId: string, urls: string[]): Promise<CharacterDto[]>;
    /**
     * Get a character
     *
     * @param characterId
     *
     * @returns Promise<CharacterDto>
     */
    getCharacterById(movieId: string, characterId: string): Promise<CharacterDto>;
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
    getMovieCharacters(movieId: string, sortBy?: string | undefined, sortDir?: string | undefined, filterGender?: string | undefined, start?: number, length?: number | undefined): Promise<CharacterList>;
};
export {};
//# sourceMappingURL=CharacterService.d.ts.map