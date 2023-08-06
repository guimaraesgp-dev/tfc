import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class UsersModelSequelize extends Model<InferAttributes<UsersModelSequelize>,
InferCreationAttributes<UsersModelSequelize>> {
  declare id: CreationOptional<number>;
  declare username: CreationOptional<string>;
  declare role: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare password: CreationOptional<string>;
}

UsersModelSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'username',
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'role',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'email',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default UsersModelSequelize;
