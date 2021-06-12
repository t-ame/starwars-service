"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var Movie_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const typeorm_1 = require("typeorm");
const bluebird_1 = __importDefault(require("bluebird"));
const constants_1 = require("../constants");
const utility_1 = require("../helpers/utility");
const Character_1 = require("./Character");
const Comment_1 = require("./Comment");
let Movie = Movie_1 = class Movie extends typeorm_1.BaseEntity {
    /**
     * Adds a movie
     *
     * @param movies
     */
    static addMovie(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const m = yield Movie_1.findOne({ where: { episodeId: movie.episodeId } });
                return m ? { movie: m, newlySaved: false } : { movie: yield Movie_1.create(movie).save(), newlySaved: true };
            }
            catch (err) {
                throw {
                    code: constants_1.ErrorCode.SERVER_ERROR,
                    message: 'Typeorm error: Unable to add movie',
                    data: err.stack,
                };
            }
        });
    }
    /**
     * Adds a list of movies
     *
     * @param movies
     */
    static addMovies(movies) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const savedMovies = yield bluebird_1.default.map(movies, (movie) => __awaiter(this, void 0, void 0, function* () {
                    const m = yield Movie_1.findOne({ where: { episodeId: movie.episodeId } });
                    return m ? m : yield Movie_1.create(movie).save();
                }));
                return savedMovies;
            }
            catch (err) {
                throw {
                    code: constants_1.ErrorCode.SERVER_ERROR,
                    message: 'Typeorm error: Unable to add movies',
                    data: err.stack,
                };
            }
        });
    }
    /**
     * Find a movie
     *
     * @param movieId
     * @param episodeId
     */
    static findMovie(movieId, episodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!movieId && !episodeId) {
                throw {
                    code: constants_1.ErrorCode.BAD_REQUEST,
                    message: 'Movie ID or Episode ID is required.',
                };
            }
            try {
                const movie = yield Movie_1.findOne({
                    where: utility_1.cleanObj({
                        episodeId,
                        movieId,
                    }),
                });
                if (!movie) {
                    throw {
                        code: constants_1.ErrorCode.RESOURCE_NOT_FOUND,
                        message: 'Movie not found',
                    };
                }
                return movie;
            }
            catch (err) {
                if (err.code) {
                    throw err;
                }
                throw {
                    code: constants_1.ErrorCode.SERVER_ERROR,
                    message: 'Typeorm error: Unable to get movie',
                };
            }
        });
    }
    /**
     * Fetch all movies
     *
     * @param start
     * @param length
     */
    static fetchAllMovies(start = 0, length) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield Movie_1.findAndCount({ order: { releaseDate: 'DESC' }, skip: start, take: length });
                return { movies: movies[0], totalCount: movies[1] };
            }
            catch (err) {
                throw {
                    code: constants_1.ErrorCode.SERVER_ERROR,
                    message: 'Typeorm error: Unable to get movies',
                };
            }
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Movie.prototype, "movieId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Movie.prototype, "episodeId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Movie.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 2000 }),
    __metadata("design:type", String)
], Movie.prototype, "openingCrawl", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Movie.prototype, "director", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Movie.prototype, "producer", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Movie.prototype, "releaseDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Movie.prototype, "url", void 0);
__decorate([
    typeorm_1.OneToMany(() => Character_1.Character, character => character.movie, { cascade: true }),
    __metadata("design:type", Array)
], Movie.prototype, "characters", void 0);
__decorate([
    typeorm_1.OneToMany(() => Comment_1.Comment, comment => comment.movie, { cascade: true }),
    __metadata("design:type", Array)
], Movie.prototype, "comments", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Movie.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Movie.prototype, "updatedAt", void 0);
Movie = Movie_1 = __decorate([
    typeorm_1.Entity({ name: 'movies' })
], Movie);
exports.Movie = Movie;
//# sourceMappingURL=Movie.js.map