import express from 'express';
import { dbStart } from './src/config/database.js';   

import "dotenv/config";

import { routerTask } from './src/routes/task.routes.js';
import { routerUser } from './src/routes/user.routes.js';
import { routerProfiles } from './src/routes/profile.routes.js';
import { routerProject } from './src/routes/project.routes.js';


const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", routerTask);
app.use("/api", routerUser);
app.use("/api", routerProfiles);
app.use("/api", routerProject);

dbStart().then( ()=> {
    app.listen(PORT, ()=> {
        console.log("Running Server, escuchando en el puerto: ", PORT)
    })
})







