"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Moduless extends sequelize_1.Model {
}
Moduless.init({
    moduleId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    languageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    levelId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    lessonId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    moduleName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    numberOfQuestions: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    difficulty: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    questionSet: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
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
    tableName: "modules",
    modelName: "moduless",
    timestamps: false,
});
exports.default = Moduless;
