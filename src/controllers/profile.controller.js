import { ProfilesModel } from "../models/profile.model.js";
import { UsersModel } from "../models/user.model.js";

export const createProfile = async (req,res) => {
    const {name,lastName,DNI,user_id} = req.body;

    try {
        if(name === null || name === undefined){
            return res.status(404).json("El campo 'name' no puede estar vacio")
        }
        if(lastName === null || lastName === undefined){
            return res.status(404).json("El campo 'lastName' no puede estar vacio")
        }
         if(DNI === null || DNI === undefined){
            return res.status(404).json("El campo 'DNI' no puede estar vacio")
        }

     const verificarDni = await ProfilesModel.findOne({ where: { DNI: DNI } });
        if (verificarDni){
            return res.status(400).json({ message: "ya exise un perfil con el 'DNI' ingresado"})
        }

        const verificarUserId = await ProfilesModel.findOne({where : {user_id : user_id}});
        if (verificarUserId){
            return res.status(400).json({message:"ya existe un usuario con un perfil ya existente"})
        }

        //Busco si existe un usuario para poder crear una tarea.
          const usuarioExiste = await UsersModel.findByPk(user_id) 
          console.log(usuarioExiste)
          if (usuarioExiste === null) {
            return res.status(400).json("No existe un usuario con ese id")
          }
          if (!usuarioExiste)
            {return res.status(400).json("Se necesita un Usuario para crear las tareas")}

          const profile = await ProfilesModel.create({name, lastName, DNI, user_id});
          return res.status(200).json(req.body)

 }catch (error) {
    console.log(error)
         return res.status(500).json({message: error})
    }
}
