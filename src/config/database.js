import "dotenv/config";
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize (
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || localhost,
        dialect: process.env.DB_DIALECT
    }

)

export const dbStart = async () => {
    try {
        await sequelize.authenticate();
        console.log("Autenticación con éxito");
        await sequelize.sync();
        console.log("Se sincronizó correctamente con la base de Datos")
    } catch (error) {
        console.log("OCUURIÓ UN ERROR CON LA CONEXIÓN A LA BASE DE DATOS")
    }
}