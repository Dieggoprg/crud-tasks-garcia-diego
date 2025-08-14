import { Router } from "express";
import {getAllTask, getfindId, createTask, updateTask, deleteTask} from "../controllers/task.controller.js"

export const routerTask = Router();

routerTask.post("/tasks", createTask)

routerTask.get("/tasks", getAllTask )

routerTask.get("/tasks/:id", getfindId)

routerTask.put("/tasks/:id", updateTask)

routerTask.delete("/tasks/:id", deleteTask)
