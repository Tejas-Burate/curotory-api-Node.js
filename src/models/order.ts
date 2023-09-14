import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Order extends Model {
 
}

Order.init(
  {
    orderId  : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId  : {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      planId  : {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalAmount  : {
        type: DataTypes.DECIMAL(),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("created","authorized","captured","refund","failed","paid","started"),
        allowNull: false,
      },
      rPaymentId  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rOrderId  : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rSignature  : {
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
    tableName: 'orders',
    modelName: 'order',
    timestamps: false,
  }
);

export default Order;
