import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { ErrorCode } from '../constants';
import { cleanObj } from '../helpers';
import { Movie } from './Movie';

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  commentId!: string;

  @Column({ type: 'varchar', length: 500 })
  comment: string;

  @Column()
  ipAddress: string;

  @ManyToOne(
    () => Movie,
    movie => movie.comments,
    { eager: true },
  )
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;

  /**
   * Adds an anonymous comment
   *
   * @param movieId
   * @param comment
   */
  static async addComment(movieId: string, comment: Comment): Promise<Comment> {
    try {
      const c = {
        ...comment,
        movie: { movieId },
      };
      return await Comment.create(c).save();
    } catch (err) {
      throw {
        code: ErrorCode.SERVER_ERROR,
        message: 'Typeorm error: Unable to add comment',
        data: err.stack,
      };
    }
  }
  /**
   * Find a character
   *
   * @param commentId
   */
  static async findComment(movieId: string, commentId: string): Promise<Comment> {
    try {
      const comment = await Comment.findOne({
        where: cleanObj({
          movie: { movieId },
          characterId: commentId,
        }),
      });
      if (!comment) {
        throw {
          code: ErrorCode.RESOURCE_NOT_FOUND,
          message: 'Comment not found',
        };
      }
      return comment;
    } catch (err) {
      if (err.code) {
        throw err;
      }
      throw {
        code: ErrorCode.SERVER_ERROR,
        message: 'Typeorm error: Unable to get comment',
      };
    }
  }
  /**
   * Fetch all movie comments
   *
   * @param movieId
   * @param start
   * @param length
   */
  static async fetchMovieComments(movieId: string, start?: number, length?: number): Promise<{ comments: Comment[]; totalCount: number }> {
    try {
      const comments = await Comment.findAndCount({
        where: cleanObj({
          movie: { movieId },
        }),
        order: { createdAt: 'DESC' },
        skip: start,
        take: length,
      });

      return { comments: comments[0], totalCount: comments[1] };
    } catch (err) {
      throw {
        code: ErrorCode.SERVER_ERROR,
        message: 'Typeorm error: Unable to get comments',
      };
    }
  }

  /**
   * Delete a movie comment
   *
   * @param comment
   */
  static async deleteComment(commentId: string): Promise<boolean> {
    try {
      await Comment.delete(commentId);
      return true;
    } catch (err) {
      throw {
        code: ErrorCode.SERVER_ERROR,
        message: 'Typeorm error: Unable to delete comment',
        data: err.stack,
      };
    }
  }
}
