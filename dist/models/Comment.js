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
var Comment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const helpers_1 = require("../helpers");
const Movie_1 = require("./Movie");
let Comment = Comment_1 = class Comment extends typeorm_1.BaseEntity {
    /**
     * Adds an anonymous comment
     *
     * @param movieId
     * @param comment
     */
    static addComment(movieId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const c = Object.assign(Object.assign({}, comment), { movie: { movieId } });
                return yield Comment_1.create(c).save();
            }
            catch (err) {
                throw {
                    code: constants_1.ErrorCode.SERVER_ERROR,
                    message: 'Typeorm error: Unable to add comment',
                    data: err.stack,
                };
            }
        });
    }
    /**
     * Find a character
     *
     * @param commentId
     */
    static findComment(movieId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield Comment_1.findOne({
                    where: helpers_1.cleanObj({
                        movie: { movieId },
                        characterId: commentId,
                    }),
                });
                if (!comment) {
                    throw {
                        code: constants_1.ErrorCode.RESOURCE_NOT_FOUND,
                        message: 'Comment not found',
                    };
                }
                return comment;
            }
            catch (err) {
                if (err.code) {
                    throw err;
                }
                throw {
                    code: constants_1.ErrorCode.SERVER_ERROR,
                    message: 'Typeorm error: Unable to get comment',
                };
            }
        });
    }
    /**
     * Fetch all movie comments
     *
     * @param movieId
     * @param start
     * @param length
     */
    static fetchMovieComments(movieId, start, length) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield Comment_1.findAndCount({
                    where: helpers_1.cleanObj({
                        movie: { movieId },
                    }),
                    order: { createdAt: 'DESC' },
                    skip: start,
                    take: length,
                });
                return { comments: comments[0], totalCount: comments[1] };
            }
            catch (err) {
                throw {
                    code: constants_1.ErrorCode.SERVER_ERROR,
                    message: 'Typeorm error: Unable to get comments',
                };
            }
        });
    }
    /**
     * Delete a movie comment
     *
     * @param comment
     */
    static deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Comment_1.delete(commentId);
                return true;
            }
            catch (err) {
                throw {
                    code: constants_1.ErrorCode.SERVER_ERROR,
                    message: 'Typeorm error: Unable to delete comment',
                    data: err.stack,
                };
            }
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Comment.prototype, "commentId", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], Comment.prototype, "comment", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "ipAddress", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Movie_1.Movie, movie => movie.comments, { eager: true }),
    typeorm_1.JoinColumn({ name: 'movieId' }),
    __metadata("design:type", Movie_1.Movie)
], Comment.prototype, "movie", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Comment.prototype, "updatedAt", void 0);
Comment = Comment_1 = __decorate([
    typeorm_1.Entity({ name: 'comments' })
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map