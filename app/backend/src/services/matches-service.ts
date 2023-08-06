import MatchesModel,
{ MatchInsertParams, MatchesGetByParams, MatchesUpdateParams } from '../models/MatchesModel';
import { IMatches } from '../Interfaces';

/**
 * Service da entidade Match
 * no constructor cria uma instância do model MatchesModel, que é um model abstrato
 * pra não misturar implementação lógica com abstrata
 */

class MatchesService {
  private matchesModel: MatchesModel;

  constructor() {
    this.matchesModel = new MatchesModel();
  }

  getAll = async (): Promise<IMatches[] | null> => this.matchesModel.getAll();

  getById = async (id: number): Promise<IMatches | null> => this.matchesModel.getById(id);

  getBy = async (params: MatchesGetByParams): Promise<IMatches[] | null> =>
    this.matchesModel.getBy(params);

  update = async (params: MatchesUpdateParams): Promise<IMatches | null> =>
    this.matchesModel.update(params);

  insert = async (params: MatchInsertParams): Promise<IMatches | null> =>
    this.matchesModel.insert(params);
}

export default MatchesService;
