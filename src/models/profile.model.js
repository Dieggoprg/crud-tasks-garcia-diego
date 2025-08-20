import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const ProfilesModel = sequelize.define("Profiles",  {
    name: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    DNI: {type: DataTypes.INTEGER, allowNull:false, unique:true}
},
{
    timestamps: false
})
