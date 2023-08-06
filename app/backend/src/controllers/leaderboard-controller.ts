import { Request, Response } from 'express';
import MatchesService from '../services/matches-service';

/**
 * Controller da entidade Teams
 * no constructor cria uma instância do serviço Teams para execução das funções MSC
 */
class LeaderboardController {
  private service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  leadboardHomeController = async (req: Request, res: Response): Promise<Response> => {
    try {
      const isHomeTeam = req.params.team === 'home';
      const response = await this.service.getPerformance(isHomeTeam);
      return res.json(response);
    } catch (e) {
      return res.status(500).send('Erro interno');
    }
  };
}

export default LeaderboardController;
