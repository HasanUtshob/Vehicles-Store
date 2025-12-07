import { Router } from "express";
import { UserControler } from "./controller.user";
import auth from "../middleware/auth";

export const route = Router();

route.post("/", UserControler.CreateUser )
route.get("/",auth("admin"),UserControler.ViewUser)
route.put("/:userId",auth("admin", "customer"), UserControler.UpdateUser)
route.delete("/:userId",auth("admin", "customer"), UserControler.DeleteUser)