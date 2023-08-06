import { Request, Response } from 'express';
import TeamsService from '../services/teams-service';

/**
 * Controller da entidade Teams
 * no constructor cria uma instância do serviço Teams para execução das funções MSC
 */
class TeamsController {
  private service: TeamsService;

  constructor() {
    this.service = new TeamsService();
  }

  getAllTeamsController = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = await this.service.getAll();
      return res.json(response);
    } catch (e) {
      return res.status(500).send('Erro interno');
    }
  };

  getTeamByIdController = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const response = await this.service.getById(+id);

      return res.json(response);
    } catch (e) {
      return res.status(500).send('Erro interno');
    }
  };
}

export default TeamsController;
