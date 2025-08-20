import { createProject, getAllProject } from "../controllers/project.controller.js";
import { Router } from "express";

export const routerProject = Router();

routerProject.post("/project", createProject);
routerProject.get("/prject", getAllProject)
