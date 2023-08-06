import * as express from 'express';
import TeamsController from '../controllers/teams-controller';

const router = express.Router();

const teamsController = new TeamsController();

router.get('/', teamsController.getAllTeamsController);
router.get('/:id', teamsController.getTeamByIdController);

export default router;
