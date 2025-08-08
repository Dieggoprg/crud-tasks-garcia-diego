import express from 'express';
import { dbStart } from './src/config/database.js';   
import "dotenv/config";
import { routerTask } from './src/routes/task.routes.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", routerTask);

dbStart().then( ()=> {
    app.listen(PORT, ()=> {
        console.log("Running Server")
    })
})







