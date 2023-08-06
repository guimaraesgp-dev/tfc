import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import TeamsModelSequelize from './TeamsModelSequelize';

class MatchesModelSequelize extends Model<InferAttributes<MatchesModelSequelize>,
InferCreationAttributes<MatchesModelSequelize>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: CreationOptional<number>;
  declare homeTeamGoals: CreationOptional<number>;
  declare awayTeamId: CreationOptional<number>;
  declare awayTeamGoals: CreationOptional<number>;
  declare inProgress: CreationOptional<boolean>;
}

MatchesModelSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

MatchesModelSequelize.hasOne(TeamsModelSequelize, {
  sourceKey: 'homeTeamId',
  as: 'homeTeam',
  foreignKey: {
    name: 'id',
  },
});

MatchesModelSequelize.hasOne(TeamsModelSequelize, {
  sourceKey: 'awayTeamId',
  as: 'awayTeam',
  foreignKey: {
    name: 'id',
  },
});

export default MatchesModelSequelize;
