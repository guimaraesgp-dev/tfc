import { Request, Response } from 'express';
import { MatchInsertParams, MatchesGetByParams, MatchesUpdateParams } from '../models/MatchesModel';
import MatchesService from '../services/matches-service';
import Token from '../utils/token';
import { IUserToken } from '../Interfaces/IUserToken';
import httpResponse from '../utils/httpResponse';

/**
 * Controller da entidade Matches
 * no constructor cria uma instância do serviço Matches para execução das funções MSC
 */
class MatchesController {
  private service: MatchesService;
  private token: Token<IUserToken>;

  constructor() {
    this.service = new MatchesService();
    this.token = new Token();
  }

  getAllMatchesController = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { inProgress } = req.query;

      const params: MatchesGetByParams = {};
      if (inProgress) params.inProgress = inProgress === 'true';

      const response = await this.service.getBy(params);
      return res.json(response);
    } catch (e) {
      return httpResponse(res);
    }
  };

  getMatchByIdController = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const response = await this.service.getById(+id);

      return res.json(response);
    } catch (e) {
      return httpResponse(res);
    }
  };

  finishMatchByIdController = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      const params: MatchesUpdateParams = {
        id: +id,
        inProgress: false,
      };

      const updated = await this.service.update(params);
      if (!updated) return httpResponse(res);

      return res.json({ message: 'Finished' });
    } catch (e) {
      return httpResponse(res);
    }
  };

  updateMatchByIdController = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      const { homeTeamGoals, awayTeamGoals } = req.body;

      const params: MatchesUpdateParams = {
        id: +id,
      };

      if (homeTeamGoals) params.homeTeamGoals = homeTeamGoals;
      if (awayTeamGoals) params.awayTeamGoals = awayTeamGoals;

      const updated = await this.service.update(params);
      if (!updated) return res.status(400).json({ message: 'Not finished' });

      return res.json({ message: 'Finished' });
    } catch (e) {
      return res.status(500).send('Erro interno');
    }
  };

  insertMatchController = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { homeTeamGoals, awayTeamGoals, awayTeamId, homeTeamId } = req.body;
      const isValidReq = await this.validateInsertMatch(req, res);
      if (isValidReq) return res;

      const params: MatchInsertParams = {
        awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId,
      };

      const match = await this.service.insert(params);
      if (!match) return res.status(400).json({ message: 'Not finished' });

      return res.status(201).json(match);
    } catch (e) {
      return httpResponse(res);
    }
  };

  private validateInsertMatch = async (req: Request, res: Response):
  Promise<Response | undefined> => {
    const { awayTeamId, homeTeamId } = req.body;
    if (awayTeamId === homeTeamId) {
      return httpResponse(res, 422, 'It is not possible to create a match with two equal teams');
    }

    const homeTeam = await this.service.getById(homeTeamId);
    if (!homeTeam) {
      return httpResponse(res, 404, 'There is no team with such id!');
    }

    const awayTeam = await this.service.getById(awayTeamId);
    if (!awayTeam) {
      return httpResponse(res, 404, 'There is no team with such id!');
    }
  };
}

export default MatchesController;
