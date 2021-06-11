import express from 'express';

import { validateAnonymousComment } from '../middlewares';
import { CommentController } from '../controllers';

const router = express.Router();

router.get('/:movieId/comments/', CommentController.getAllCommentsForMovie);

router.get('/:movieId/comments/:commentId', CommentController.getCommentById);

router.post('/:movieId/comments/', validateAnonymousComment(), CommentController.addCommentToMovie);

router.delete('/:movieId/comments/:commentId', CommentController.deleteCommentById);

export default router;
