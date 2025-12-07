import dotenv from "dotenv";
import path from "path";
dotenv.config({path : path.join(process.cwd(), ".env")})

const config = {
    PG_Connection : process.env.Connection_Str,
    PORT : process.env.PORT,
    JwtSecret : process.env.Secret,
}

export default config;