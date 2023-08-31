"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class TeacherDetails extends sequelize_1.Model {
}
TeacherDetails.init({
    teacherDetailId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: false,
    },
    proficiency: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    trainedAt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    certification: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    experience: {
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
    tableName: 'teacherdetails',
    modelName: 'teacherdetails',
    timestamps: false,
});
exports.default = TeacherDetails;
