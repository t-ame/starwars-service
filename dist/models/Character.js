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
var Character_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const utility_1 = require("../helpers/utility");
const Movie_1 = require("./Movie");
let Character = Character_1 = class Character extends typeorm_1.BaseEntity {
    /**
     * Adds a movie character
     *
     * @param movieId
     * @param character
     */
    static addMovieCharacter(movieId, character) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const c = Object.assign(Object.assign({}, character), { movie: { movieId } });
                return yield Character_1.create(c).save();
            }
            catch (err) {
                throw {
                    code: constants_1.ErrorCode.SERVER_ERROR,
                    message: 'Typeorm error: Unable to add character',
                    data: err.stack,
                };
            }
        });
    }
    /**
     * Find a character
     *
     * @param characterId
     */
    static findCharacter(movieId, characterId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const character = yield Character_1.findOne({
                    where: utility_1.cleanObj({
                        movie: { movieId },
                        characterId,
                    }),
                });
                if (!character) {
                    throw {
                        code: constants_1.ErrorCode.RESOURCE_NOT_FOUND,
                        message: 'Character not found',
                    };
                }
                return character;
            }
            catch (err) {
                if (err.code) {
                    throw err;
                }
                throw {
                    code: constants_1.ErrorCode.SERVER_ERROR,
                    message: 'Typeorm error: Unable to get character',
                };
            }
        });
    }
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
    static fetchMovieCharacters(movieId, orderBy, orderDirection, filterGender, start, length) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const characters = yield Character_1.findAndCount({
                    where: utility_1.cleanObj({
                        movie: { movieId },
                        gender: filterGender,
                    }),
                    order: { [orderBy]: orderDirection },
                    skip: start,
                    take: length,
                });
                return { characters: characters[0], totalCount: characters[1] };
            }
            catch (err) {
                throw {
                    code: constants_1.ErrorCode.SERVER_ERROR,
                    message: 'Typeorm error: Unable to get characters',
                };
            }
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Character.prototype, "characterId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Character.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Character.prototype, "height", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Character.prototype, "mass", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Character.prototype, "hairColor", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Character.prototype, "skinColor", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Character.prototype, "eyeColor", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Character.prototype, "birthYear", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Character.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Character.prototype, "homeWorld", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Character.prototype, "url", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Movie_1.Movie, movie => movie.characters, { eager: true }),
    typeorm_1.JoinColumn({ name: 'movieId' }),
    __metadata("design:type", Movie_1.Movie)
], Character.prototype, "movie", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Character.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Character.prototype, "updatedAt", void 0);
Character = Character_1 = __decorate([
    typeorm_1.Entity({ name: 'characters' })
], Character);
exports.Character = Character;
//# sourceMappingURL=Character.js.map