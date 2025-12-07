import { Request, Response } from "express";
import { VehiclesInfo } from "./service.vehicles";
import { PGpool } from "../config/Db";



const InsertVehicles = async (req : Request, res : Response) => {

    const {vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;

    try{

        const result = await VehiclesInfo.PostVehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status )

        res.status(201).json({

            success : true,
            message : "Vehicle created successfully",
            data : result.rows


        })



    }catch(err : any){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }



}

const ViewAllVehicles = async (req : Request, res : Response) => {

    try{
        const result = await VehiclesInfo.GetVehicles()

            res.status(200).json({

            success : true,
            message : "Vehicles retrived Successfully",
            data : result.rows
        })
    }catch(err : any){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }



}

const ViewSingleVehicles = async (req : Request, res : Response) => {

    try {
           
const result = await VehiclesInfo.GetSingleVehicles(req.params.vehicleId !)

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found or invalid vehicleId",
      });
    }



res.status(200).json({
    success : true,
    message : "Vehicle retrieved successfully",
    data : result.rows[0]
})


    } catch (error : any) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }


}



const Updatevehicles = async(req : Request, res : Response) => {

    const {vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;

    try {
        const result = await VehiclesInfo.PutVehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status, req.params.vehicleId ! )


    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found or invalid vehicleId",
      });
    }


       res.status(200).json({
            success : true,
            message : "Vehicle Data Update Successfully",
            data : result.rows
        })

    } catch (error : any) {
               res.status(500).json({
            success : false,
            message : error.message
        })
    }



}





const DeleteVehicle = async(req : Request, res : Response) => {
    try {
        const result = await VehiclesInfo.deleteVehicles(req.params.vehicleId!)


      if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found or invalid vehicleId",
      });
    }

       res.status(200).json({
            success : true,
            message : "Vehicle deleted successfully",
        })

    } catch (error : any) {
            res.status(500).json({
            success : false,
            message : error.message
        })
    }



}








export const VehiclesController = {
    InsertVehicles,
    ViewAllVehicles,
    ViewSingleVehicles,
    Updatevehicles,
    DeleteVehicle

}