import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Plan extends Model {
 
}

Plan.init(
  {
    planId  : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    languageId  : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },

    planName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    planSubtitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      planPrice  : {
        type: DataTypes.DECIMAL(),
        allowNull: false,
      },

      planDuration  : {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      planDesc: {
        type: DataTypes.JSON,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM('Active', 'Deactive'),
        allowNull: false,
      },

      isLivePlan: {
        type: DataTypes.INTEGER,
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
    tableName: 'plans',
    modelName: 'plan',
    timestamps: false,
  }
);

export default Plan;
