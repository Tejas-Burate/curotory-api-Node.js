import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class LiveTest extends Model {}

LiveTest.init(
  {
    testId: {
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
    lesson: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    testImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    testName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rightAns: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wrongAns: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalQues: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questions: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
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
    tableName: "livetests",
    modelName: "LiveTest",
    timestamps: false,
  }
);

export default LiveTest;
