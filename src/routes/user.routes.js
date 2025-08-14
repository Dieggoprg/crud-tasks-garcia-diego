import { Router } from "express";
import { getAllUser, getUserfindId, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
export const routerUser = Router();

routerUser.post("/users", createUser)

routerUser.get("/users", getAllUser)

routerUser.get("/users/:id",getUserfindId )

routerUser.put("/users/:id", updateUser )

routerUser.delete("/users/:id", deleteUser)
