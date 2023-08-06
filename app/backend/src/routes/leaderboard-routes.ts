import * as express from 'express';
import LeaderboardController from '../controllers/leaderboard-controller';

const router = express.Router();

const leaderboardController = new LeaderboardController();

router.get('/:team', leaderboardController.leadboardHomeController);

export default router;
