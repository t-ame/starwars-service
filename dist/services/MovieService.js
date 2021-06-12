"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const models_1 = require("../models");
const handlers_1 = require("../handlers");
const helpers_1 = require("../helpers");
const CharacterService_1 = require("./CharacterService");
const CommentService_1 = require("./CommentService");
exports.MovieService = {
    /**
     * Get a movie
     *
     * @returns Promise<MovieDto>
     */
    getMovieById(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let movieData = helpers_1.MovieMapper.mapMovieToDto(yield models_1.Movie.findMovie(movieId));
                //Adding comment count and URLs to access this movie, its comments and characters
                movieData.commentCount = yield CommentService_1.CommentService.getMovieCommentsCount(movieId);
                movieData.comments = `/movies/${movieData.movieId}/comments`;
                movieData.characters = `/movies/${movieData.movieId}/characters`;
                movieData.url = `/movies/${movieData.movieId}`;
                return movieData;
            }
            catch (err) {
                throw Object.assign({}, err);
            }
        });
    },
    /**
     * Get movie list
     *
     * @returns Promise<MovieDto[]>
     */
    getAllMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieList = yield handlers_1.HttpRequestHandler.makeGetCall('https://swapi.dev/api/films/');
                let movies = yield bluebird_1.default.map(movieList.data.results, (movie) => __awaiter(this, void 0, void 0, function* () {
                    const savedMovie = yield models_1.Movie.addMovie(helpers_1.MovieMapper.mapIncomingToMovie(movie));
                    const mov = savedMovie.movie;
                    const commentCount = CommentService_1.CommentService.getMovieCommentsCount(mov.movieId);
                    if (savedMovie.newlySaved) {
                        //Fetch movie characters and add to database
                        const characters = movie.characters;
                        CharacterService_1.CharacterService.fetchListOfMovieCharactersByUrl(mov.movieId, characters).catch(err => handlers_1.ErrorLog.log(err));
                    }
                    let movieData = helpers_1.MovieMapper.mapMovieToDto(mov);
                    //Adding comment count and URLs to access this movie, its comments and characters
                    movieData.commentCount = yield commentCount;
                    movieData.comments = `/movies/${movieData.movieId}/comments`;
                    movieData.characters = `/movies/${movieData.movieId}/characters`;
                    movieData.url = `/movies/${movieData.movieId}`;
                    return movieData;
                }));
                movies.sort((a, b) => +new Date(a.releaseDate) - +new Date(b.releaseDate));
                return { movies, totalCount: movies.length };
            }
            catch (err) {
                throw Object.assign({}, err);
            }
        });
    },
};
//# sourceMappingURL=MovieService.js.map