"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Meeting extends sequelize_1.Model {
}
Meeting.init({
    meetingId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    users: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    languageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    meetingTitle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    meetingStartDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    meetingEndDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    dateCreated: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    dateModified: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "meetings",
    modelName: "meeting",
    timestamps: false,
});
exports.default = Meeting;
