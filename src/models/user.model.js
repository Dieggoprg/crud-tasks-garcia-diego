import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const UsersModel = sequelize.define("Users", {
    name : {type: DataTypes.STRING(100),unique: true, allowNull: false},
    email : {type: DataTypes.STRING(100), allowNull: false},
    password : {type: DataTypes.STRING(100), allowNull: false}
})