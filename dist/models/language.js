"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Language extends sequelize_1.Model {
}
Language.init({
    languageId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    languageName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    languageObj: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    languageImage: {
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
    tableName: 'languages',
    modelName: 'language',
    timestamps: false,
});
exports.default = Language;
