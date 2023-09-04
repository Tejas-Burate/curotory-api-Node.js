import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Level extends Model {
}

Level.init(
  {
    levelId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    languageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
      },
    levelName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateModified: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'levels',
    modelName: 'level',
    timestamps: false,
  }
);

export default Level;
