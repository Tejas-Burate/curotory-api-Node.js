import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Moduless extends Model {}

Moduless.init(
  {
    moduleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    languageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lessonId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moduleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfQuestions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    questionSet: {
      type: DataTypes.JSON,
      allowNull: true,
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
    tableName: "modules",
    modelName: "moduless",
    timestamps: false,
  }
);

export default Moduless;
