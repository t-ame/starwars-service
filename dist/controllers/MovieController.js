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
exports.MovieController = void 0;
const handlers_1 = require("../handlers");
const services_1 = require("../services");
exports.MovieController = {
    /**
     * Get a movie
     *
     * @param req
     * @param res
     */
    getMovieById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId } = req.params;
            try {
                const movie = yield services_1.MovieService.getMovieById(movieId);
                res.status(200).json(movie);
            }
            catch (err) {
                handlers_1.handleErrorResponse(err, res);
            }
        });
    },
    /**
     * Get list of all Star Wars movies
     *
     * @param req
     * @param res
     */
    getAllMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield services_1.MovieService.getAllMovies();
                res.status(200).json(movies);
            }
            catch (err) {
                handlers_1.handleErrorResponse(err, res);
            }
        });
    },
};
//# sourceMappingURL=MovieController.js.map