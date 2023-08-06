import * as express from 'express';
import LoginController from '../controllers/login-controller';
import ValidationsMiddleware from '../middlewares/validations-middleware';

const router = express.Router();

const loginController = new LoginController();

router.post('/', ValidationsMiddleware.loginValidation, loginController.loginController);
router.get('/role', ValidationsMiddleware.roleValidation, loginController.roleController);

export default router;
