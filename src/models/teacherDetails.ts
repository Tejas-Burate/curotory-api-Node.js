import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class TeacherDetails extends Model {
  // public empId!: number;
  // public empName!: string;
  // public salary!: number;
  // public createdAt!: Date;
  // public updatedAt!: Date;
}

TeacherDetails.init(
  {
    teacherDetailId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
      },
    proficiency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trainedAt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      certification: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      experience: {
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
    tableName: 'teacherdetails',
    modelName: 'teacherdetails',
    timestamps: false,
  }
);

export default TeacherDetails;
