import { TaskModel } from "../models/task.model.js";

export const getAllTask = async (req, res) => {
    try {
        const getTask = await TaskModel.findAll();

        if(!getTask) { return res.status(400).json("No se encontraron las Tareas")}

        return res.status(200).json("Tareas Encontradas ", getTask)

    } catch (error) {
        return res.status(500).json({message: error})
    }
}
