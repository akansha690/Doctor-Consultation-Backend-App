import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "./sequelize";


class Payment extends Model<InferAttributes<Payment>, InferCreationAttributes<Payment>> {
  declare id: CreationOptional<number>;
  declare bookingId: number;
  declare patientId: number;
  declare amount: number;
  declare status: "PENDING" | "SUCCESS" | "FAILED";
  declare razorpayOrderId: string | null;
  declare razorpayPaymentId: string | null;
  declare razorpaySignature: string | null;
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED"),
      defaultValue: "PENDING",
    },
    razorpayOrderId: {
      type: DataTypes.STRING,
    },
    razorpayPaymentId: {
      type: DataTypes.STRING,
    },
    razorpaySignature: {
      type: DataTypes.STRING,
    },
    createdAt:{
    type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    },
    deletedAt:{
        type: DataTypes.DATE
    }
  },
  { sequelize: sequelize, 
    tableName: "payments" ,
    underscored:true
  }
);

export default Payment;
