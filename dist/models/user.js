"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class User extends sequelize_1.Model {
}
User.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    otp: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    languageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    dateOfBirth: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("Staged", "Provisioned", "Active", "Recovery"),
        allowNull: false,
    },
    profileImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    deviceRegistrationToken: {
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
    tableName: 'user',
    modelName: 'user',
    timestamps: false,
});
exports.default = User;
