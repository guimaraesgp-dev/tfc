import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class TeamsModelSequelize extends Model<InferAttributes<TeamsModelSequelize>,
InferCreationAttributes<TeamsModelSequelize>> {
  declare id: CreationOptional<number>;
  declare teamName: CreationOptional<string>;
}

TeamsModelSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default TeamsModelSequelize;
