import { ProjectModel } from "../models/project.model.js";
import { ProfilesModel } from "../models/profile.model.js";

export const createProject = async (req , res) => {
    const {name, status, description, user_id} = req.body;

    try {
        if(name===null || name===undefined){
            return res.status(400).json("El name no debe estar Vacio")
        }
        if(status===null || status===undefined){
            return res.status(400).json("El status no debe estar Vacio")
        }
        if(description===null || description===undefined){
            return res.status(400).json("La description no debe estar Vacia")
        }

        const verificarProfile = await ProfilesModel.findByPk(user_id)
        if (verificarProfile === null || verificarProfile === undefined){
            return res.status(404).json("El id no corresponde a ningún Usuario, debes cambiar a un id correspondiente a un perfil o crearlo")
        }
        if(verificarProfile){
            const project = await ProjectModel.create(req.body);
            return res.status(201).json(project)
        }
    } catch (error) {
        
    }
}

export const getAllProject = async (req,res) => {
    try {
        const getProject = await ProjectModel.findAll({
            include : {
                model : ProfilesModel
            }
        })
        
        if (getAllProject) {return res.status(200).json(getAllProject)}
        else res.status(404).json({message: "Tarea no encontrada"})
    } catch (error) {
        return res.status(500).json({message : error})
        
    }
}