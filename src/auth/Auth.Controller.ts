import { Request, Response } from "express";
import { AuthServices } from "./Auth.service";

const LoginCheck = async(req : Request, res : Response) => {


const {email , password} = req.body;


try {
  const result = await AuthServices.LoginUser(email, password);

  const { password: hidden, ...safeUser } = result.user;

  res.status(200).json({
    success: true,
    message: "Login Successful",
    data: {
      token: result.token,
      user: safeUser,   
      
    }
  });

} catch (error: any) {
  res.status(400).json({ 
    success: false,
    message: error.message
  });
}


}

export const AuthController = {
    LoginCheck,
}