import express from 'express';
import cors from 'cors';
import { handleRouteError } from '../handlers';

import movieRoutes from './movies';
import characterRoutes from './characters';
import commentRoutes from './comments';

const router: express.Router = express.Router();

router.use(cors());

router.use('/movies', movieRoutes);

router.use('/movies', characterRoutes);

router.use('/movies', commentRoutes);

router.use('/health', (req, res) => {
  res.send({ status: 'OK' });
});

router.use(handleRouteError);

export default router;
