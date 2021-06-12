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
exports.CharacterService = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const models_1 = require("../models");
const handlers_1 = require("../handlers");
const helpers_1 = require("../helpers");
exports.CharacterService = {
    /**
     * Get a movie character from external URL
     *
     * @param movieId
     * @param url
     *
     * @returns Promise<CharacterDto>
     */
    fetchMovieCharacterByUrl(movieId, url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const characterData = yield handlers_1.HttpRequestHandler.makeGetCall(url);
                const character = yield models_1.Character.addMovieCharacter(movieId, helpers_1.CharacterMapper.mapIncomingToCharacter(characterData.data));
                return character;
            }
            catch (err) {
                throw Object.assign({}, err);
            }
        });
    },
    /**
     * Get a movie character from external URL
     *
     * @param movieId
     * @param url
     *
     * @returns Promise<CharacterDto>
     */
    fetchListOfMovieCharactersByUrl(movieId, urls) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bluebird_1.default.map(urls, (url) => __awaiter(this, void 0, void 0, function* () {
                    return yield this.fetchMovieCharacterByUrl(movieId, url);
                }));
            }
            catch (err) {
                throw Object.assign({}, err);
            }
        });
    },
    /**
     * Get a character
     *
     * @param characterId
     *
     * @returns Promise<CharacterDto>
     */
    getCharacterById(movieId, characterId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let charDto = helpers_1.CharacterMapper.mapCharacterToDto(yield models_1.Character.findCharacter(movieId, characterId));
                charDto.url = `/movies/${movieId}/characters/${charDto.characterId}`;
                return charDto;
            }
            catch (err) {
                throw Object.assign({}, err);
            }
        });
    },
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
    getMovieCharacters(movieId, sortBy, sortDir, filterGender, start = 0, length) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sortBy !== 'name' && sortBy !== 'height') {
                sortBy = 'name';
                sortDir = 'ASC';
            }
            if (sortDir !== 'ASC' && sortDir !== 'DESC') {
                sortDir = 'ASC';
            }
            try {
                const characterList = yield models_1.Character.fetchMovieCharacters(movieId, sortBy, sortDir, filterGender, start, length);
                const characters = characterList.characters;
                let totalHeightCm = 0;
                for (let i = 0; i < characters.length; ++i) {
                    totalHeightCm += characters[i].height;
                }
                const d = totalHeightCm / 2.54;
                const totalHeightFt = Math.floor(d / 12);
                const totalheightIn = (d % 12).toFixed(2);
                const totalheightFtIn = `${totalHeightFt}ft and ${totalheightIn}inches`;
                const c = characters.map(char => {
                    let charDto = helpers_1.CharacterMapper.mapCharacterToDto(char);
                    charDto.url = `/movies/${movieId}/characters/${charDto.characterId}`;
                    return charDto;
                });
                return {
                    characters: c,
                    totalCount: characterList.totalCount,
                    totalHeightCm,
                    totalheightFtIn,
                };
            }
            catch (err) {
                throw Object.assign({}, err);
            }
        });
    },
};
//# sourceMappingURL=CharacterService.js.map