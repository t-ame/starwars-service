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
exports.CommentService = void 0;
const models_1 = require("../models");
const helpers_1 = require("../helpers");
exports.CommentService = {
    /**
     * Add an anonymous comment
     *
     * @param movieId
     * @param comment
     *
     * @returns Promise<CommentDto>
     */
    addNewComment(movieId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newComment = yield models_1.Comment.addComment(movieId, helpers_1.CommentMapper.mapDtoToComment(comment));
                let comm = helpers_1.CommentMapper.mapCommentToDto(newComment);
                comm.url = `/movies/${movieId}/comments/${comm.commentId}`;
                helpers_1.Logger.Info(`New comment added to movie: ${movieId}, Commenter IP Address: ${comment.ipAddress}`);
                return comm;
            }
            catch (err) {
                throw Object.assign({}, err);
            }
        });
    },
    /**
     * Get a comment
     *
     * @param movieId
     * @param commentId
     *
     * @returns Promise<CommentDto>
     */
    getCommentById(movieId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let comment = helpers_1.CommentMapper.mapCommentToDto(yield models_1.Comment.findComment(movieId, commentId));
                comment.url = `/movies/${movieId}/comments/${comment.commentId}`;
                return comment;
            }
            catch (err) {
                throw Object.assign({}, err);
            }
        });
    },
    /**
     * Get all movie comments
     *
     * @param movieId
     * @param start
     * @param length
     *
     * @returns Promise<CommentDto[]>
     */
    getMovieComments(movieId, start = 0, length) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentList = yield models_1.Comment.fetchMovieComments(movieId, start, length);
                const comments = commentList.comments.map(comment => {
                    let comm = helpers_1.CommentMapper.mapCommentToDto(comment);
                    comm.url = `/movies/${movieId}/comments/${comm.commentId}`;
                    return comm;
                });
                return {
                    comments,
                    totalCount: commentList.totalCount,
                };
            }
            catch (err) {
                throw Object.assign({}, err);
            }
        });
    },
    /**
     * Get all movie comments count
     *
     * @param movieId
     *
     * @returns Promise<number>
     */
    getMovieCommentsCount(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentList = yield models_1.Comment.fetchMovieComments(movieId);
                return commentList.totalCount;
            }
            catch (err) {
                throw Object.assign({}, err);
            }
        });
    },
    /**
     * Delete a comment
     *
     * @param commentId
     *
     * @returns Promise<CommentDto>
     */
    deleteCommentById(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.Comment.deleteComment(commentId);
                return {
                    success: true,
                    message: 'comment deleted successfully.',
                };
            }
            catch (err) {
                throw Object.assign({}, err);
            }
        });
    },
};
//# sourceMappingURL=CommentService.js.map