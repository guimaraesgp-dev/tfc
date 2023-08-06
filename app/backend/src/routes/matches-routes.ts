import * as express from 'express';
import ValidationsMiddleware from '../middlewares/validations-middleware';
import MatchesController from '../controllers/matches-controller';

const router = express.Router();

const matchesController = new MatchesController();

router.get('/', matchesController.getAllMatchesController);
router.get('/:id', matchesController.getMatchByIdController);

router.patch(
  '/:id/finish',
  ValidationsMiddleware.roleValidation,
  matchesController.finishMatchByIdController,
);

router.patch(
  '/:id',
  ValidationsMiddleware.roleValidation,
  matchesController.updateMatchByIdController,
);

router.post(
  '/',
  ValidationsMiddleware.roleValidation,
  matchesController.insertMatchController,
);
export default router;
