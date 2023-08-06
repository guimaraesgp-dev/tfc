import TeamsModel from '../models/TeamsModel';
import { ITeam } from '../Interfaces/ITeam';

/**
 * Service da entidade Teams
 * no constructor cria uma instância do model TeamsModel, que é um model abstrato
 * pra não misturar implementação lógica com abstrata
 */

class TeamsService {
  private teamsModel: TeamsModel;

  constructor() {
    this.teamsModel = new TeamsModel();
  }

  getAll = async (): Promise<ITeam[] | null> => this.teamsModel.getAll();

  getById = async (id: number): Promise<ITeam | null> => this.teamsModel.getById(id);
}

export default TeamsService;
