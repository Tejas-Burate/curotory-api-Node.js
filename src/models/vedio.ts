import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Video extends Model {

}

Video.init(
  {
    videoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    languageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      levelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lessonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      videoName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      videoThumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      videoFileName: {
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
    tableName: 'videos',
    modelName: 'video',
    timestamps: false,
  }
);

export default Video;
