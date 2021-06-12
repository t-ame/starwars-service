"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.get('/:movieId/characters/:characterId', controllers_1.CharacterController.getCharacterById);
router.get('/:movieId/characters', controllers_1.CharacterController.getCharactersForMovie);
exports.default = router;
//# sourceMappingURL=characters.js.map