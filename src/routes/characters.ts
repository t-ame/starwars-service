import express from 'express';
import { CharacterController } from '../controllers';

const router = express.Router();

router.get('/:movieId/characters/:characterId', CharacterController.getCharacterById);

router.get('/:movieId/characters', CharacterController.getCharactersForMovie);

export default router;
