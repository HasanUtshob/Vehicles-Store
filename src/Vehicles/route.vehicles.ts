import { Router } from "express";
import { VehiclesController } from "./controller.vehicles";
import auth from "../middleware/auth";


export const Vehiclesroute = Router();

Vehiclesroute.post("/",auth("admin"), VehiclesController.InsertVehicles)

Vehiclesroute.get("/",VehiclesController.ViewAllVehicles)

Vehiclesroute.get("/:vehicleId", VehiclesController.ViewSingleVehicles)

Vehiclesroute.put("/:vehicleId", auth("admin"), VehiclesController.Updatevehicles)

Vehiclesroute.delete("/:vehicleId", auth("admin"), VehiclesController.DeleteVehicle)

