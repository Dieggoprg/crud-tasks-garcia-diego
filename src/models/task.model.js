import { sequelize } from "../config/database.js";
import { DataTypes} from "sequelize";
import { UsersModel } from "./user.model.js";

export const TaskModel = sequelize.define("Tasks", {
    title : {type: DataTypes.STRING(100), unique:true, allowNull: false},
    description : {type: DataTypes.STRING(100), allowNull: false},
    isComplete : {type: DataTypes.BOOLEAN, defaultValue: false}
},
{
    timestamps: false
}
);

//------Relaciones de Uno a Muchos-----//
//un usuario tiene muchas tareas
UsersModel.hasMany(TaskModel, {
    foreignKey : "user_id"
})

TaskModel.belongsTo(UsersModel, {
    foreignKey : "user_id"
})


