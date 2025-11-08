import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import {sequelize} from '../models/sequelize'

export class DoctorProfile extends Model<InferAttributes<DoctorProfile>, InferCreationAttributes<DoctorProfile>> {

    declare id : CreationOptional<number>
    declare fullName: string
    declare age: number
    declare specialisation: string
    declare education: string
    declare consultationFee: string
    declare experience: number
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date>
    
}

DoctorProfile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        fullName:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        age:{
            type: DataTypes.INTEGER,
        },
        specialisation:{
            type:DataTypes.STRING,
            allowNull:false
        },
        education:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        consultationFee:{
            type:DataTypes.STRING,
            allowNull:false
        },
        experience:{
            type:DataTypes.STRING,
            allowNull:false
        },
        createdAt:{
            type:DataTypes.DATE
        },
        updatedAt:{
             type:DataTypes.DATE
        },
        deletedAt:{
             type:DataTypes.DATE
        },
    },

    {
        tableName : 'doctorProfiles',
        sequelize: sequelize, 
        timestamps:true, 
        underscored: true
    }

)