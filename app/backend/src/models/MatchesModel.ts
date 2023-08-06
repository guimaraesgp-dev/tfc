import MatchesModelSequelize from '../database/models/MatchesModelSequelize';
import { IMatches } from '../Interfaces';
import { IGetAll, IGetAllResponse, IGetBy, IGetById, IInsert, IUpdate } from '../Interfaces/IModel';

class MatchesModel implements
  IGetAll<IMatches>,
  IGetById<IMatches>,
  IGetBy<IMatches[], MatchesGetByParams>,
  IUpdate<IMatches, MatchesUpdateParams>,
  IInsert<IMatches, MatchInsertParams> {
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

  update = async (params: MatchesUpdateParams): Promise<IMatches | null> => {
    const model = await this.model.findByPk(params.id);
    if (!model) return null;

    if (params.inProgress !== undefined) model.inProgress = params.inProgress;
    if (params.homeTeamGoals !== undefined) model.homeTeamGoals = params.homeTeamGoals;
    if (params.awayTeamGoals !== undefined) model.awayTeamGoals = params.awayTeamGoals;

    await model.save();
    return model;
  };

  insert = async (params: MatchInsertParams): Promise<IMatches | null> => {
    const matchModel = new MatchesModelSequelize({
      ...params,
      inProgress: true,
    });
    await matchModel.save();
    return matchModel;
  };
}

export type MatchesGetByParams = {
  inProgress?: boolean
};

export type MatchesUpdateParams = {
  id: number
  inProgress?: boolean
  homeTeamGoals?: number,
  awayTeamGoals?: number
};

export type MatchInsertParams = {
  homeTeamId: number
  awayTeamId: number
  homeTeamGoals: number,
  awayTeamGoals: number
};

export default MatchesModel;
