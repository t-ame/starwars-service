import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import compression from 'compression';
import dotenv from 'dotenv';

import ApiRoutes from './routes';

dotenv.config();

const app = express();

app.set('port', process.env.APP_PORT);
app.set('env', process.env.NODE_ENV);

app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  compression({
    filter: (req: Request, res: Response) => {
      if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
      }
      // fallback to standard filter function
      return compression.filter(req, res);
    },
  }),
);

app.disable('x-powered-by');

const router = express.Router();

router.use(ApiRoutes);

app.use(router);

export default app;
