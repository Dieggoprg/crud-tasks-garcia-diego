import { TaskModel } from "../models/task.model.js";
import { UsersModel } from "../models/user.model.js";

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
        const {title, description, isComplete, user_id} = req.body;

        try {

          if (title === undefined || title === null)
             {return res.status(400).json({message : "El titulo no debe estar vacio"})}

          if (description === undefined || description === null)
             {return res.status(400).json({message : "El titulo no debe estar vacio"})}

          if (typeof isComplete !== "boolean")
             {return res.status(400).json({message : "El campo 'isComplete debe ser de tipo Boolean"})}

          if (title.length > 100 || description.length > 100)
             {return res.status(400).json("Los campos no deben pasar los 100 Caracteres")} 

          const titleUnique = await TaskModel.findOne({where : {title}});
          if (titleUnique) {return res.status(400).json({message : "ya existe una tarea con este Titulo"})}
          
          //Busco si existe un usuario para poder crear una tarea.
          const usuarioExiste = await UsersModel.findByPk(user_id) 
          console.log(usuarioExiste)
          if (usuarioExiste === null) {
            return res.status(400).json("No existe un usuario con ese id")
          }
          if (!usuarioExiste)
            {return res.status(400).json("Se necesita un Usuario para crear las tareas")}

          const task = await TaskModel.create({title, description, isComplete, user_id});
          return res.status(200).json("Se creó la tarea con éxito ",task)

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }

export const updateTask = async (req,res) => {
    const {title, description, isComplete} = req.body;
    const {id} = req.params.id;


     try {
          if (title === undefined || title === null) {return res.status(400).json({message : "El titulo no debe estar vacio"})}

          if (description === undefined || description === null) {return res.status(400).json({message : "El titulo no debe estar vacio"})}

          if (typeof isComplete !== "boolean") {return res.status(400).json({message : "El campo 'isComplete debe ser de tipo Boolean"})}

          if (title.length > 100 || description.length > 100) {return res.status(400).json("Los campos no deben pasar los 100 Caracteres")}

          const titleUnique = await TaskModel.findOne({where : {title}});
          if (titleUnique) {return res.status(400).json({message : "ya existe una tarea con este Titulo"})}

          const [taskActualizado] = TaskModel.update(req.body, {where:{id:req.params.id}});
          if (taskActualizado) {  return res.status(200).json(taskActualizado)}
          
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
}

export const deleteTask = async (req, res) => {
    const {id} = req.params;
    try {
        const deleted = await TaskModel.destroy({where : {id}});

        if (deleted > 0){return res.status(200).json("Tarea Eliminada")
        } else {return res.status(404).json("Tarea no encontrada")}
    } catch (error) {
        return res.status(500).json({message : error})
    }
}