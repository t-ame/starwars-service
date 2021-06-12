"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.get('/:movieId/comments/', controllers_1.CommentController.getAllCommentsForMovie);
router.get('/:movieId/comments/:commentId', controllers_1.CommentController.getCommentById);
router.post('/:movieId/comments/', middlewares_1.validateAnonymousComment(), controllers_1.CommentController.addCommentToMovie);
router.delete('/:movieId/comments/:commentId', controllers_1.CommentController.deleteCommentById);
exports.default = router;
//# sourceMappingURL=comments.js.map