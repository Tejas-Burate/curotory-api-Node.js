import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class User extends Model {

}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
      },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      languageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Staged","Provisioned","Active", "Recovery"),
        allowNull: false,
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deviceRegistrationToken: {
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
    tableName: 'user',
    modelName: 'user',
    timestamps: false,
  }
);

export default User;
