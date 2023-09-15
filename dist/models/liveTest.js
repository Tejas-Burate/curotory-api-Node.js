"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class LiveTest extends sequelize_1.Model {
}
LiveTest.init({
    testId: {
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
    lesson: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    testImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    testName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    rightAns: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    wrongAns: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    totalQues: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    questions: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    time: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    endDate: {
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
    tableName: "livetests",
    modelName: "LiveTest",
    timestamps: false,
});
exports.default = LiveTest;
