import MatchesModelSequelize from '../database/models/MatchesModelSequelize';
import { IMatches } from '../Interfaces';
import { IGetAll, IGetAllResponse, IGetBy, IGetById } from '../Interfaces/IModel';

class MatchesModel implements
IGetAll<IMatches>, IGetById<IMatches>, IGetBy<IMatches[], MatchesGetByParams> {
  private readonly model = MatchesModelSequelize;

  getById = async (id: number): Promise<IMatches | null> => this.model.findByPk(id);

  getAll = async (): Promise<IGetAllResponse<IMatches>> => this.model.findAll({
    include: {
      all: true,
    },
  });

  getBy = async (params: MatchesGetByParams): Promise<IMatches[] | null> => {
    const matchesModels = await this.model.findAll({
      where: params,
      include: {
        all: true,
      },
    });

    return matchesModels;
  };
}

export type MatchesGetByParams = {
  inProgress?: boolean
};

export default MatchesModel;
