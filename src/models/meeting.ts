import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Meeting extends Model {}

Meeting.init(
  {
    meetingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    users: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    languageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    meetingTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meetingStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    meetingEndDate: {
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
    tableName: "meetings",
    modelName: "meeting",
    timestamps: false,
  }
);

export default Meeting;
