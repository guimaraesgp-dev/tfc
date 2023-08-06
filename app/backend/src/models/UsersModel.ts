import UsersModelSequelize from '../database/models/UsersModelSequelize';
import { IUser } from '../Interfaces';
import { IGetAll, IGetAllResponse, IGetBy, IGetById } from '../Interfaces/IModel';

class UsersModel implements IGetAll<IUser>, IGetById<IUser>, IGetBy<IUser, UsersModelGetBy> {
  private readonly model = UsersModelSequelize;

  getBy = async (params: UsersModelGetBy): Promise<IUser | null> => this.model.findOne({
    where: params,
  });

  getById = async (id: number): Promise<IUser | null> => this.model.findByPk(id);

  getAll = async (): Promise<IGetAllResponse<IUser>> => this.model.findAll();
}

export type UsersModelGetBy = {
  email: string
};

export default UsersModel;
