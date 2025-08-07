import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const task = sequelize("Tasks", {
    title : {type: DataTypes.STRING(100), allowNull: false},
    description : {type: DataTypes.STRING(100), allowNull: false},
    isComplete : {type: DataTypes.BOOLEAN, default: false}
})