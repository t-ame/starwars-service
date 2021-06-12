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
exports.CommentController = void 0;
const handlers_1 = require("../handlers");
const services_1 = require("../services");
exports.CommentController = {
    /**
     * Get list of all commnets in a movie
     *
     * @param req
     * @param res
     */
    getAllCommentsForMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId } = req.params;
            try {
                const comments = yield services_1.CommentService.getMovieComments(movieId);
                res.status(200).json(comments);
            }
            catch (err) {
                handlers_1.handleErrorResponse(err, res);
            }
        });
    },
    /**
     * Get comment in a movie by ID
     *
     * @param req
     * @param res
     */
    getCommentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId, commentId } = req.params;
            try {
                const comments = yield services_1.CommentService.getCommentById(movieId, commentId);
                res.status(200).json(comments);
            }
            catch (err) {
                handlers_1.handleErrorResponse(err, res);
            }
        });
    },
    /**
     * Add a new anonymous comment to a movie
     *
     * @param req
     * @param res
     */
    addCommentToMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId } = req.params;
            const comment = req.body;
            const xfx = req.headers['x-forwarded-for'];
            comment.ipAddress = (xfx ? xfx[0] : undefined) || req.connection.remoteAddress;
            try {
                const newComment = yield services_1.CommentService.addNewComment(movieId, comment);
                res.status(200).json(newComment);
            }
            catch (err) {
                handlers_1.handleErrorResponse(err, res);
            }
        });
    },
    /**
     * Delete a comment by ID
     *
     * @param req
     * @param res
     */
    deleteCommentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { commentId } = req.params;
            try {
                const status = yield services_1.CommentService.deleteCommentById(commentId);
                res.status(200).json(status);
            }
            catch (err) {
                handlers_1.handleErrorResponse(err, res);
            }
        });
    },
};
//# sourceMappingURL=CommentController.js.map