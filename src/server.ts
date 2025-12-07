import express, { Router } from "express"
import { Request, Response } from "express";
import config from "./config/index"
import { initDB } from "./config/Db";
import { route } from "./User/route.user";
import { Vehiclesroute } from "./Vehicles/route.vehicles";
import { BookingsRoute } from "./Bookings/route.booking";
import { Authroute } from "./auth/Auth.route";
const app = express()
app.use(express.json())
const port = config.PORT


initDB()


// User 
app.use("/api/v1/auth/signup", route)

app.use("/api/v1/users", route)


// Vehicles 

app.use("/api/v1/vehicles", Vehiclesroute)

// Bookings 

app.use("/api/v1/bookings", BookingsRoute )


// Auth 

app.use("/api/v1/auth/signin", Authroute)

app.get('/', (req : Request, res : Response) => {
  res.send('This is assignment 2 time left 12 hours fuck')
})






























app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
