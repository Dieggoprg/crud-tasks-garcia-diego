import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { ProfilesModel } from "./profile.model.js";


export const UsersModel = sequelize.define("Users", {
    name : {type: DataTypes.STRING(100),unique: true, allowNull: false},
    email : {type: DataTypes.STRING(100), allowNull: false},
    password : {type: DataTypes.STRING(100), allowNull: false}
},
{
    timestamps: false
})


//-----Relaciones de Uno a Uno-----//
//un Usuario tiene un perfil//
UsersModel.hasOne(ProfilesModel, {
    foreignKey : "user_id"
})

ProfilesModel.belongsTo(UsersModel, {
    foreignKey : "user_id"
})

