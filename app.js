import express from 'express';
import { dbStart } from './src/config/database.js';    
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());


dbStart().then( ()=> {
    app.listen(PORT, ()=> {
        console.log("Running Server")
    })
})







