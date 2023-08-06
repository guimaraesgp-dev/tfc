import UsersModelSequelize from '../database/models/UsersModelSequelize';
import { IUser } from '../Interfaces';
import { IGetAll, IGetAllResponse, IGetById } from '../Interfaces/IModel';

class UsersModel implements IGetAll<IUser>, IGetById<IUser> {
  private readonly model = UsersModelSequelize;

  getById = async (id: number): Promise<IUser | null> => this.model.findByPk(id);

  getAll = async (): Promise<IGetAllResponse<IUser>> => this.model.findAll();
}

export default UsersModel;
