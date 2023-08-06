import { Request, Response } from 'express';
import LoginService from '../services/login-service';

/**
 * Controller da entidade Users
 * no constructor cria uma instância do serviço Users para execução das funções MSC
 */
class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  loginController = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      const loginResponse = await this.service.login({ email, password });
      if (!loginResponse) return res.status(401).json({ message: 'Invalid email or password' });

      const { token } = loginResponse;
      return res.json({ token });
    } catch (e) {
      return res.status(500).send('Erro interno');
    }
  };

  roleController = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { authorization } = req.headers;
      const token = authorization?.split(' ').at(-1) || '';

      const tokenResponse = await this.service.verifyToken({ token });
      if (!tokenResponse) return res.status(401).json({ message: 'Token must be a valid token' });

      const { role } = tokenResponse;
      return res.json({ role });
    } catch (e) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}

export default LoginController;
