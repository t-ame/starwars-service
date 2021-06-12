export interface IncomingMovieDto {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director?: string;
    producer?: string;
    release_date?: string;
    characters?: string[];
    url?: string;
}
export interface IncomingCharacterDto {
    name?: string;
    height?: number;
    mass?: string;
    hair_color?: string;
    skin_color?: string;
    eye_color?: string;
    birth_year?: string;
    gender?: string;
    homeworld?: string;
    url?: string;
}
export interface MovieDto {
    movieId?: string;
    name?: string;
    openingCrawl?: string;
    commentCount?: number;
    releaseDate?: string;
    comments?: string;
    characters?: string;
    url?: string;
}
export interface CharacterDto {
    characterId?: string;
    name?: string;
    height?: number;
    mass?: string;
    hairColor?: string;
    skinColor?: string;
    eyeColor?: string;
    birthYear?: string;
    gender?: string;
    homeWorld?: string;
    url?: string;
}
export interface CommentDto {
    commentId?: string;
    comment: string;
    ipAddress?: string;
    createdAt?: string;
    url?: string;
}
export interface StatusDto {
    success: boolean;
    message: string;
}
//# sourceMappingURL=DTO.d.ts.map