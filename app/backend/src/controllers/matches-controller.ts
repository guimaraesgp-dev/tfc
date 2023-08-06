import { Request, Response } from 'express';
import { MatchesGetByParams } from '../models/MatchesModel';
import MatchesService from '../services/matches-service';

/**
 * Controller da entidade Matches
 * no constructor cria uma instância do serviço Matches para execução das funções MSC
 */
class MatchesController {
  private service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  getAllMatchesController = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { inProgress } = req.query;

      const params: MatchesGetByParams = {};
      if (inProgress) params.inProgress = inProgress === 'true';

      const response = await this.service.getBy(params);
      return res.json(response);
    } catch (e) {
      console.log(e);
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

export default MatchesController;
