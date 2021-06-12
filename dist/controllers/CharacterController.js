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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterController = void 0;
const handlers_1 = require("../handlers");
const services_1 = require("../services");
exports.CharacterController = {
    /**
     * Get a character in a movie
     *
     * @param req
     * @param res
     */
    getCharacterById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId, characterId } = req.params;
            try {
                const character = yield services_1.CharacterService.getCharacterById(movieId, characterId);
                res.status(200).json(character);
            }
            catch (err) {
                handlers_1.handleErrorResponse(err, res);
            }
        });
    },
    /**
     * Get list of all characters in a movie
     *
     * @param req
     * @param res
     */
    getCharactersForMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId } = req.params;
            const { filterGender, sortBy, sortDir } = req.query;
            try {
                const characters = yield services_1.CharacterService.getMovieCharacters(movieId, sortBy, sortDir, filterGender);
                res.status(200).json(characters);
            }
            catch (err) {
                handlers_1.handleErrorResponse(err, res);
            }
        });
    },
};
//# sourceMappingURL=CharacterController.js.map