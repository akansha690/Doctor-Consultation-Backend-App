import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import {sequelize} from '../models/sequelize'


export class AvailabilitySlot extends Model<InferAttributes<AvailabilitySlot>, InferCreationAttributes<AvailabilitySlot>> {

    declare id : CreationOptional<number>
    declare doctorId: number
    declare date: Date
    declare day : string
    declare isAvailable : boolean
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date>
    
}

AvailabilitySlot.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        doctorId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            unique:true
        },
        day:{
            type:DataTypes.STRING,
            allowNull:false
        },
        date:{
            type:DataTypes.DATE,
            allowNull:false
        },
        isAvailable:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: true
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
        tableName : 'availabilitySlots',
        sequelize: sequelize, 
        timestamps:true, 
        underscored: true
    }

)