import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "./sequelize";

export enum enumRole {
  PATIENT =  "PATIENT",
  DOCTOR  =  "DOCTOR"
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: CreationOptional<number>
    declare email: string
    declare username: string
    declare password: string
    declare role: enumRole
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare deletedAt: CreationOptional<Date>
}

User.init({
  id:{
    type: DataTypes.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  username:{
    type:DataTypes.STRING,
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  },
  role:{ 
    type: DataTypes.ENUM(...Object.values(enumRole)),
    defaultValue: enumRole.PATIENT
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
{
  sequelize: sequelize,
  tableName: 'users',
  underscored:true
})

export default User;