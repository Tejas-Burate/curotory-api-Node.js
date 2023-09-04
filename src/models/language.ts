import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Language extends Model {
 
}

Language.init(
  {
    languageId : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   
    languageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    languageObj: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      languageImage: {
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
    tableName: 'languages',
    modelName: 'language',
    timestamps: false,
  }
);

export default Language;
