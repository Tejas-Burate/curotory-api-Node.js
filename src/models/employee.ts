import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Employee extends Model {
  // public empId!: number;
  // public empName!: string;
  // public salary!: number;
  // public createdAt!: Date;
  // public updatedAt!: Date;
}

Employee.init(
  {
    empId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    empName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'employees',
    modelName: 'employee',
    timestamps: true,
  }
);

export default Employee;
