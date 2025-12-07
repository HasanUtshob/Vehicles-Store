import { PGpool } from "../config/Db"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import config from "../config";

const LoginUser = async(email : string, password : string) => {

    const hasEmail = await PGpool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if(hasEmail.rows.length === 0){
        throw new Error("Email Khuje Painai");
    }

    const user = hasEmail.rows[0];

    const isMatched = await bcrypt.compare(password, user.password);

    if(!isMatched){

        throw new Error("Password Wrong"); 

    }

    const Secret = config.JwtSecret;

    const token = jwt.sign({id: user.id, name : user.name, email : user.email, role : user.role}, Secret as string, {
        expiresIn : "30d",

    })


    // console.log(token);

    return {
        user,
        token
    }
}


export const AuthServices = {
    LoginUser,
}