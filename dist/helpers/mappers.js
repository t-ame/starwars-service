"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentMapper = exports.CharacterMapper = exports.MovieMapper = void 0;
class MovieMapper {
    static mapIncomingToMovie(movie) {
        const { title: name, episode_id: episodeId, opening_crawl: openingCrawl, release_date, characters: charactersURLs } = movie, rest = __rest(movie, ["title", "episode_id", "opening_crawl", "release_date", "characters"]);
        let m = Object.assign(Object.assign({}, rest), { name,
            episodeId,
            openingCrawl, releaseDate: new Date(release_date) });
        return m;
    }
    static mapMovieToDto(movie) {
        const { movieId, name, openingCrawl, releaseDate } = movie;
        let m = {
            movieId,
            name,
            openingCrawl,
            commentCount: 0,
            releaseDate: releaseDate.toISOString().split('T')[0],
        };
        return m;
    }
}
exports.MovieMapper = MovieMapper;
class CharacterMapper {
    static mapIncomingToCharacter(character) {
        const { hair_color: hairColor, skin_color: skinColor, eye_color: eyeColor, birth_year: birthYear, homeworld: homeWorld } = character, rest = __rest(character, ["hair_color", "skin_color", "eye_color", "birth_year", "homeworld"]);
        let c = Object.assign(Object.assign({}, rest), { hairColor,
            skinColor,
            eyeColor,
            birthYear,
            homeWorld });
        return c;
    }
    static mapCharacterToDto(character) {
        const { characterId, name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender } = character;
        let m = {
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
exports.CharacterMapper = CharacterMapper;
class CommentMapper {
    static mapDtoToComment(comment) {
        const { createdAt } = comment;
        let d = createdAt ? new Date(createdAt) : undefined;
        let m = Object.assign(Object.assign({}, comment), { createdAt: d });
        return m;
    }
    static mapCommentToDto(commentData) {
        const { commentId, comment, ipAddress, createdAt } = commentData;
        let m = {
            commentId,
            comment,
            ipAddress,
            createdAt: createdAt.toUTCString(),
        };
        return m;
    }
}
exports.CommentMapper = CommentMapper;
//# sourceMappingURL=mappers.js.map