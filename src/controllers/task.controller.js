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


export const getfindId = async (req, res) => {
    const {id} = req.params;
    try {
        const task = await TaskModel.findByPk(req.params.id);

        if (task) {return res.status(200).json(task)}
        else res.status(404).json({message: "Tarea no encontrada"})

    } catch (error) {
        return res.status(500).json({message: error})
    }
}

export const createTask = async (req , res) => {
        const {title, description, isComplete} = req.body;

    
        try {
          if (title === undefined || title === null) {return res.status(400).json({message : "El titulo no debe estar vacio"})}
          if (description === undefined || description === null) {return res.status(400).json({message : "El titulo no debe estar vacio"})}

          const task = TaskModel.create({
            title, description, isComplete
          });
          return res.status(200).json("Se creó la tarea con éxito ",task)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }

export const updateTask = async (req,res) => {
    const {id, title, description, isComplete} = req.body;

     try {
          if (title === undefined || title === null) {return res.status(400).json({message : "El titulo no debe estar vacio"})}
          if (description === undefined || description === null) {return res.status(400).json({message : "El titulo no debe estar vacio"})}

          const [taskActualizado] = TaskModel.update(req.body, {where:{id:req.params.id}});
          if (taskActualizado) {  return res.status(200).json(taskActualizado)}
        
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
}
