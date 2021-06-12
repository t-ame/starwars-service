import { BaseEntity } from 'typeorm';
import { Movie } from './Movie';
export declare class Character extends BaseEntity {
    characterId: string;
    name: string;
    height: number;
    mass: string;
    hairColor: string;
    skinColor: string;
    eyeColor: string;
    birthYear: string;
    gender: string;
    homeWorld: string;
    url?: string;
    movie: Movie;
    createdAt: Date;
    updatedAt: Date;
    /**
     * Adds a movie character
     *
     * @param movieId
     * @param character
     */
    static addMovieCharacter(movieId: string, character: Character): Promise<Character>;
    /**
     * Find a character
     *
     * @param characterId
     */
    static findCharacter(movieId: string, characterId: string): Promise<Character>;
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
    static fetchMovieCharacters(movieId: string, orderBy: 'name' | 'height', orderDirection: 'ASC' | 'DESC', filterGender?: string, start?: number, length?: number): Promise<{
        characters: Character[];
        totalCount: number;
    }>;
}
//# sourceMappingURL=Character.d.ts.map