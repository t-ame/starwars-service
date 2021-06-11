import { Character, Comment, Movie } from '../models';
import { CharacterDto, CommentDto, IncomingCharacterDto, IncomingMovieDto, MovieDto } from '../interfaces';

export class MovieMapper {
  public static mapIncomingToMovie(movie: IncomingMovieDto): Movie {
    const { title: name, episode_id: episodeId, opening_crawl: openingCrawl, release_date, characters: charactersURLs, ...rest } = movie;
    let m = <Movie>{
      ...rest,
      name,
      episodeId,
      openingCrawl,
      releaseDate: new Date(release_date!),
    };
    return m;
  }
  public static mapMovieToDto(movie: Movie): MovieDto {
    const { movieId, name, openingCrawl, releaseDate } = movie;
    let m = <MovieDto>{
      movieId,
      name,
      openingCrawl,
      commentCount: 0,
      releaseDate: releaseDate.toISOString().split('T')[0],
    };
    return m;
  }
}

export class CharacterMapper {
  public static mapIncomingToCharacter(character: IncomingCharacterDto): Character {
    const {
      hair_color: hairColor,
      skin_color: skinColor,
      eye_color: eyeColor,
      birth_year: birthYear,
      homeworld: homeWorld,
      ...rest
    } = character;
    let c = <Character>{
      ...rest,
      hairColor,
      skinColor,
      eyeColor,
      birthYear,
      homeWorld,
    };
    return c;
  }

  public static mapCharacterToDto(character: Character): CharacterDto {
    const { characterId, name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender } = character;
    let m = <CharacterDto>{
      characterId,
      name,
      height,
      mass,
      hairColor,
      skinColor,
      eyeColor,
      birthYear,
      gender,
    };
    return m;
  }
}

export class CommentMapper {
  public static mapDtoToComment(comment: CommentDto): Comment {
    const { createdAt } = comment;
    let d = createdAt ? new Date(createdAt) : undefined;
    let m = <Comment>{
      ...comment,
      createdAt: d,
    };
    return m;
  }
  public static mapCommentToDto(commentData: Comment): CommentDto {
    const { commentId, comment, ipAddress, createdAt } = commentData;
    let m = <CommentDto>{
      commentId,
      comment,
      ipAddress,
      createdAt: createdAt.toUTCString(),
    };
    return m;
  }
}
