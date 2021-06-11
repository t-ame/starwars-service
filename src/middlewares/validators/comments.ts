import { body } from 'express-validator';

import { Validator } from './Validator';

export const validateAnonymousComment = () => {
  return Validator.validate([
    body('comment', 'Provide a valid comment, must be between 1 and 500 characters long.').isLength({
      min: 1,
      max: 500,
    }),
  ]);
};
