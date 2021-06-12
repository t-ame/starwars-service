"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.get('/:movieId', controllers_1.MovieController.getMovieById);
router.get('/', controllers_1.MovieController.getAllMovies);
exports.default = router;
//# sourceMappingURL=movies.js.map