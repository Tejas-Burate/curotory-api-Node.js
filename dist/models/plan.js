"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Plan extends sequelize_1.Model {
}
Plan.init({
    planId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    languageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    planName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    planSubtitle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    planPrice: {
        type: sequelize_1.DataTypes.DECIMAL(),
        allowNull: false,
    },
    planDuration: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    planDesc: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Active', 'Deactive'),
        allowNull: false,
    },
    isLivePlan: {
        type: sequelize_1.DataTypes.INTEGER,
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
    tableName: 'plans',
    modelName: 'plan',
    timestamps: false,
});
exports.default = Plan;
