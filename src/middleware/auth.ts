// Higher Order Fuction 

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token provided",
        });
      }

  
      if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1]; 
      }

     
      const decoded = jwt.verify(token as string, config.JwtSecret as string) as JwtPayload;

   
      req.user = decoded;

      // ✔ Role based access check
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized role access",
        });
      }

      return next();

    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};

export default auth;
