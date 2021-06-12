/* istanbul ignore file */
import errorHandler from 'errorhandler';
import { createConnection } from 'typeorm';

import app from '../app';
import dbConnection from '../dbmanager/typeorm';
import { autoCreateDb } from '../dbmanager/mysql';
import { Logger } from '../helpers';

app.use(errorHandler());

(async () => {
  await autoCreateDb();

  await createConnection(dbConnection)
    .then(() => {
      const port = process.env.PORT || 7000;

      // Initialize server
      const server = app.listen(port, () => {
        Logger.Info(`Service Started at http://localhost:${port}`);
        Logger.Info('Press CTRL+C to stop\n');
      });

      // Nodemon dev hack
      process.once('SIGUSR2', function() {
        server.close(function() {
          process.kill(process.pid, 'SIGUSR2');
        });
      });
    })
    .catch(error => {
      Logger.Error('(TypeORM) Database connection error: ', error);
    });
})();
