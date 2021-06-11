import express from 'express';
import { MovieController } from '../controllers';

const router = express.Router();

router.get('/:movieId', MovieController.getMovieById);

router.get('/', MovieController.getAllMovies);

export default router;
