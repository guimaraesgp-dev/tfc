import { Request, Response, NextFunction } from 'express';
import Token from '../utils/token';
import { IUserToken } from '../Interfaces/IUserToken';

class ValidationsMiddleware {
  static loginValidation = async (req: Request, res: Response, next: NextFunction):
  Promise<Response | void> => {
    const password = req.body.password || req.query.password;
    const email = req.body.email || req.query.email;

    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    if (!password) return res.status(400).json({ message: 'All fields must be filled' });

    const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailValidation.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return next();
  };

  static roleValidation = async (req: Request, res: Response, next: NextFunction):
  Promise<Response | void> => {
    try {
      const { authorization } = req.headers;

      if (!authorization) return res.status(401).json({ message: 'Token not found' });

      const token: Token<IUserToken> = new Token();

      const authToken = authorization?.split(' ').at(-1) || '';
      const userInfo = token.verify(authToken);
      if (!userInfo) {
        return res.status(401).send({ message: 'Token must be a valid token' });
      }

      return next();
    } catch (e) {
      return res.status(401).send({ message: 'Token must be a valid token' });
    }
  };
}

export default ValidationsMiddleware;
