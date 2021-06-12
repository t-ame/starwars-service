import { Character, Comment, Movie } from '../models';
import { CharacterDto, CommentDto, IncomingCharacterDto, IncomingMovieDto, MovieDto } from '../interfaces';
export declare class MovieMapper {
    static mapIncomingToMovie(movie: IncomingMovieDto): Movie;
    static mapMovieToDto(movie: Movie): MovieDto;
}
export declare class CharacterMapper {
    static mapIncomingToCharacter(character: IncomingCharacterDto): Character;
    static mapCharacterToDto(character: Character): CharacterDto;
}
export declare class CommentMapper {
    static mapDtoToComment(comment: CommentDto): Comment;
    static mapCommentToDto(commentData: Comment): CommentDto;
}
//# sourceMappingURL=mappers.d.ts.map