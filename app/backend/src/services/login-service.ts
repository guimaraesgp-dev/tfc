import Token from '../utils/token';
import UsersModel from '../models/UsersModel';
import Hash from '../utils/hash';
import { IUserToken } from '../Interfaces/IUserToken';

/**
 * Service da entidade Teams
 * no constructor cria uma instância do model TeamsModel, que é um model abstrato
 * pra não misturar implementação lógica com abstrata
 */

class LoginService {
  private usersModel: UsersModel;
  private token: Token<IUserToken>;

  constructor() {
    this.usersModel = new UsersModel();
    this.token = new Token();
  }

  // getAll = async (): Promise<IUser[] | null> => this.usersModel.getAll();

  // getById = async (id: number): Promise<IUser | null> => this.usersModel.getById(id);

  login = async (params: LoginParams): Promise<LoginResult> => {
    const user = await this.usersModel.getBy({ email: params.email });
    if (!user) return null;

    const data = {
      hash: user.password,
      plain: params.password,
    };

    const isValidPassword = await Hash.compare(data);
    if (!isValidPassword) return null;

    const tokenPayload: IUserToken = {
      id: user.id,
      role: user.role,
      createdAt: new Date(),
    };

    const token = this.token.generate(tokenPayload);

    return {
      token,
      role: user.role,
    };
  };

  verifyToken = async (params: VerifyTokenParams): Promise<IUserToken | null> => {
    const { token } = params;
    if (!token) return null;

    const userInfo = this.token.verify(token);
    return userInfo;
  };
}

type LoginParams = {
  email: string
  password: string
};

type LoginResult = {
  token: string
  role: string
} | null;

type VerifyTokenParams = {
  token: string
};

export default LoginService;
