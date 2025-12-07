import { Router } from "express";
import { AuthController } from "./Auth.Controller";
// import auth from "../middleware/auth";

export const Authroute = Router()


Authroute.post("/",AuthController.LoginCheck)