import * as express from 'express';
import MatchesController from '../controllers/matches-controller';

const router = express.Router();

const matchesController = new MatchesController();

router.get('/', matchesController.getAllMatchesController);
// router.get('/:id', matchesController.getTeamByIdController);

export default router;
