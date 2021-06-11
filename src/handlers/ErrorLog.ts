/* istanbul ignore file */

import { Logger } from '../helpers';

export const ErrorLog = {
  /**
   * Log an error
   * @param err
   */
  log(err: Error | string) {
    'string' === typeof err ? Logger.Error('SERVER_ERROR: ', err) : Logger.Error('SERVER_ERROR: ', err);
  },
};
