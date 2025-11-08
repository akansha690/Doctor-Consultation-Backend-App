import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import {sequelize} from '../models/sequelize'


export enum statusEnum {
    PENDING = 'PENDING',
    BOOKED = 'BOOKED',
    CANCELLED = 'CANCELLED'
}

export class Booking extends Model<InferAttributes<Booking>, InferCreationAttributes<Booking>> {

    declare id : CreationOptional<number>
    declare patientId: number
    declare doctorId: number
    declare availabilityId: number
    declare price: string
    declare status: statusEnum
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date>
    
}

Booking.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        patientId :{
            type: DataTypes.INTEGER,
            allowNull:false,
            unique: true
        },
        doctorId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            unique:true
        },
        availabilityId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        price:{
            type:DataTypes.STRING,
            allowNull:false
        },
        status:{
            type:DataTypes.ENUM,
        },
        createdAt:{
            type:DataTypes.DATE
        },
        updatedAt:{
             type:DataTypes.DATE
        },
        deletedAt:{
             type:DataTypes.DATE
        }
    },

    {
        tableName : 'bookings',
        sequelize: sequelize, 
        timestamps:true, 
        underscored: true
    }

)