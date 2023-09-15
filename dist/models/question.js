"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Question extends sequelize_1.Model {
}
Question.init({
    qId: {
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
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    question: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    solution: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    optionList: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    difficultyLevel: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: sequelize_1.DataTypes.STRING,
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
    tableName: "questions",
    modelName: "question",
    timestamps: false,
});
exports.default = Question;
