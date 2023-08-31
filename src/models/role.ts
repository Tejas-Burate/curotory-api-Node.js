import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Role extends Model {
  // public empId!: number;
  // public empName!: string;
  // public salary!: number;
  // public createdAt!: Date;
  // public updatedAt!: Date;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
      },
    roleName: {
      type: DataTypes.STRING,
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
    tableName: 'role',
    modelName: 'role',
    timestamps: false,
  }
);

export default Role;
