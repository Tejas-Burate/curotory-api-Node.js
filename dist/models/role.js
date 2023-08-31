"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Role extends sequelize_1.Model {
}
Role.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
    },
    roleName: {
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
    tableName: 'role',
    modelName: 'role',
    timestamps: false,
});
exports.default = Role;
