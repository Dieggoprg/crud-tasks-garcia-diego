import { UsersModel } from "../models/user.model.js";
import { Op } from "sequelize";

export const getAllUser = async (req, res) => {
    try {
        const getUser = await UsersModel.findAll();

        if(!getUser) { return res.status(400).json("No se encontraron las Tareas")}
        return res.status(200).json("Tareas Encontradas ", getUser)

    } catch (error) {
        return res.status(500).json({message: error})
    }
}


export const getUserfindId = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await UsersModel.findByPk(req.params.id);

        if (user) {return res.status(200).json(user)}
        else res.status(404).json({message: "Tarea no encontrada"})

    } catch (error) {
        return res.status(500).json({message: error})
    }
}

export const createUser = async (req , res) => {
    const {name, email, password} = req.body;
 try {
     if (!name || !email || !password) {return res.status(400).json({ message: "los campos no deben estar vacios" })}
     if (password > 100) {return res.status(400).json({message : "El password no debe contener más de 100 carácteres"})}

        const verificarEmail = await UsersModel.findOne({ where: { email: email } });
        if (verificarEmail) {return res.status(400).json({ message: "ya existe un usuario con este email"})}

        const user = UsersModel.create(req.body);
        return res.status(200).json("Se creó el Usuario con éxito ",user)
 } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Ocurrió un error"})
    }
}

export const updateUser = async (req,res) => {
 const {name, email, password} = req.body;
 const {id} = req.params.id

    try {
     const user = await UsersModel.findByPk(req.params.id);
     if (!user) {return res.status(404).json({Message : "Ususario noo encontrado"})}
     if (!name || !email || !password) {return res.status(400).json({message: "Los campos no pueden estar vacíos"})}

     const existeEmail = await UsersModel.findOne({ where: { email: {email}, id: {[Op.ne]: req.params.id}}})
     if (existeEmail) {return res.status(400).json({message : "Email ya existente"})}

     if (name !== undefined && typeof name !== "string") {
      return res.status(400).json({message: "el nombre solamente puede ser string."})}

      if (email !== undefined && typeof email !== "string") {
      return res.status(400).json({message: "el email solamente puede ser string"})}

     const [userActualizado] = UsersModel.update(req.body, {where:{id:req.params.id}});
     if (userActualizado) {  return res.status(200).json("Usuario Actualizado con total éxito ",userActualizado)}
 } catch (error) {
      console.log(error)
        return res.status(500).json({message: "error"})
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const deleted = await UsersModel.destroy({where : {id}});

        if (deleted > 0){return res.status(200).json("Usuario Eliminado")
        } else {return res.status(404).json("Usuario no encontrado")}

    } catch (error) {
        return res.status(500).json({message : error})
    }
}