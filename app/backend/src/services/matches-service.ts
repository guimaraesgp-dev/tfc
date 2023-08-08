import MatchesModel,
{ MatchInsertParams, MatchesGetByParams, MatchesUpdateParams } from '../models/MatchesModel';
import { IMatches } from '../Interfaces';

class MatchesService {
  private matchesModel: MatchesModel;

  constructor() {
    this.matchesModel = new MatchesModel();
  }

  private basePerformance = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
  };

  getAll = async (): Promise<IMatches[] | null> => this.matchesModel.getAll();
  getBy = async (params: MatchesGetByParams):
  Promise<IMatches[] | null> => this.matchesModel.getBy(params);

  getById = async (id: number):
  Promise<IMatches | null> => this.matchesModel.getById(id);

  update = async (params: MatchesUpdateParams):
  Promise<IMatches | null> => this.matchesModel.update(params);

  insert = async (params: MatchInsertParams):
  Promise<IMatches | null> => this.matchesModel.insert(params);

  private doPerformanceResponse = (params: DoPerformanceResponseParams): TeamPerformanceType => {
    const { data: pData, isDraw, isHomeTeam, isLoss, isVictory, teamData } = params;
    const totalVictories = pData.totalVictories + +(isHomeTeam ? isVictory : !isVictory);
    const totalDraws = pData.totalDraws + +isDraw;
    const totalLosses = pData.totalLosses + +(isHomeTeam ? isLoss : !isLoss);
    let goalsFavor = pData.goalsFavor + (isHomeTeam
      ? (teamData.homeTeamGoals - teamData.awayTeamGoals)
      : (teamData.awayTeamGoals - teamData.homeTeamGoals));
    goalsFavor = goalsFavor < 0 ? 0 : goalsFavor;
    const goalsOwn = pData.goalsOwn + teamData.awayTeamGoals;
    const name = (isHomeTeam ? teamData.homeTeam?.teamName || ''
      : teamData.awayTeam?.teamName || '');
    const totalGames = pData.totalGames + 1;
    const totalPoints = (totalVictories * 3) + (totalDraws * 2);
    return {
      goalsFavor, goalsOwn, name, totalDraws, totalGames, totalLosses, totalPoints, totalVictories,
    };
  };

  getPerformance = async (isHomeTeam: boolean): Promise<TeamPerformanceType[]> => {
    const teamsData = await this.matchesModel.getAll() || [];
    const teamsPerformance: TeamPerformanceType[] = [];

    teamsData.forEach((teamData) => {
      const currentTeamPerformance = teamsPerformance.find((team) => team.name
        === (isHomeTeam ? teamData.homeTeam?.teamName : teamData.awayTeam?.teamName))
        || this.basePerformance;
      const isVictory = teamData.homeTeamGoals > teamData.awayTeamGoals;
      const isDraw = teamData.homeTeamGoals === teamData.awayTeamGoals;
      const isLoss = teamData.homeTeamGoals < teamData.awayTeamGoals;
      const pData = this.doPerformanceResponse({
        data: currentTeamPerformance, isDraw, isHomeTeam, isLoss, isVictory, teamData,
      });

      const teamPerformanceKey = teamsPerformance.findIndex((team) => team.name === pData.name);
      if (teamPerformanceKey > -1) teamsPerformance[teamPerformanceKey] = pData;
      else teamsPerformance.push(pData);
    });

    return teamsPerformance;
  };
}

type DoPerformanceResponseParams = {
  data: TeamPerformanceType
  teamData: IMatches
  isVictory: boolean
  isLoss: boolean
  isDraw: boolean
  isHomeTeam: boolean
};

type TeamPerformanceType = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
};

export default MatchesService;
