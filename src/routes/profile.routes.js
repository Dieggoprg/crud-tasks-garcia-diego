import { Router } from "express";
import {createProfile, getAllProfiles} from "../controllers/profile.controller.js"

export const routerProfiles = Router();

routerProfiles.post("/profile", createProfile);
routerProfiles.get("/profile",getAllProfiles);