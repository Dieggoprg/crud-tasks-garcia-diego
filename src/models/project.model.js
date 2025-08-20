import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UsersModel } from "./user.model.js";

export const ProjectModel = sequelize.define("Projects",
    {
        name : {type: DataTypes.STRING, allowNull:false, unique: true},
        status : {type: DataTypes.ENUM("pending", "active", "finished"), allowNull:false},
        description: {type: DataTypes.TEXT, allowNull: false}

    },
    {
        timestamps: false
    })

    //----Relaciones Muchos a Muchos----//
    //muchos usuarios tienen muchos projectos//

    UsersModel.belongsToMany(ProjectModel, {
        through: "Users_Projects",
        foreignKey : "user_id",
        as: "author"
    })

    ProjectModel.belongsToMany(UsersModel, {
        through : "Users_Projects",
        foreignKey : "project_id",
        as: "project"
    })
