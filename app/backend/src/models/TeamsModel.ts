import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import { ITeam } from '../Interfaces';
import { IGetAll, IGetAllResponse, IGetById } from '../Interfaces/IModel';

class TeamsModel implements IGetAll<ITeam>, IGetById<ITeam> {
  private readonly model = TeamsModelSequelize;

  getById = async (id: number): Promise<ITeam | null> => this.model.findByPk(id);

  getAll = async (): Promise<IGetAllResponse<ITeam>> => this.model.findAll();
}

export default TeamsModel;
