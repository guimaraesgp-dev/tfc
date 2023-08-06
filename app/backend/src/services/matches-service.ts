/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
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

  getBy = async (params: MatchesGetByParams): Promise<IMatches[] | null> =>
    this.matchesModel.getBy(params);

  getById = async (id: number): Promise<IMatches | null> =>
    this.matchesModel.getById(id);

  update = async (params: MatchesUpdateParams): Promise<IMatches | null> =>
    this.matchesModel.update(params);

  insert = async (params: MatchInsertParams): Promise<IMatches | null> =>
    this.matchesModel.insert(params);

  getPerformance = async (isHomeTeam: boolean): Promise<TeamPerformanceType[]> => {
    const teamsData = await this.matchesModel.getAll() || [];
    const teamsPerformance: TeamPerformanceType[] = [];
    teamsData.forEach((teamData) => {
      const teamPerformanceKey = teamsPerformance.findIndex(
        (team) => team.name === teamData.homeTeam?.teamName,
      );
      const currentTeamPerformance = teamsPerformance[teamPerformanceKey];
      const gameFinished = teamData.inProgress === false;

      let isVictory = gameFinished && teamData.homeTeamGoals > teamData.awayTeamGoals;
      isVictory = isHomeTeam ? isVictory : !isVictory;

      const isDraw = gameFinished && teamData.homeTeamGoals === teamData.awayTeamGoals;

      let isLoss = gameFinished && teamData.homeTeamGoals < teamData.awayTeamGoals;
      isLoss = isHomeTeam ? isLoss : !isLoss;

      let totalVictories = (currentTeamPerformance?.totalVictories || 0);
      totalVictories = isVictory ? totalVictories + 1 : totalVictories;

      let totalDraws = (currentTeamPerformance?.totalDraws || 0);
      totalDraws = isDraw ? totalDraws + 1 : totalDraws;

      let totalLosses = (currentTeamPerformance?.totalLosses || 0);
      totalLosses = isLoss ? totalLosses + 1 : totalLosses;

      const goalsFavor = (currentTeamPerformance?.goalsFavor || 0)
      + teamData.homeTeamGoals + teamData.awayTeamGoals;

      const goalsOwn = (currentTeamPerformance?.goalsOwn || 0) + teamData.awayTeamGoals;

      const name = (isHomeTeam ? teamData.homeTeam?.teamName : teamData.awayTeam?.teamName) || '';

      const data: TeamPerformanceType = {
        name,
        totalPoints: (totalVictories * 3) + (totalDraws * 2),
        totalGames: (currentTeamPerformance?.totalGames || 0) + 1,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
      };

      if (teamPerformanceKey > -1) teamsPerformance[teamPerformanceKey] = data;
      else teamsPerformance.push(data);
    });
    return teamsPerformance;
  };
}

type TeamPerformanceType = {
  name: string,
  totalPoints: number
  totalGames: number
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
};
export default MatchesService;
