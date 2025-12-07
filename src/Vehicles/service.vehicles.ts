import { PGpool } from "../config/Db"

const PostVehicles = async (vehicle_name : string , type : string, registration_number : string, daily_rent_price: number, availability_status : string) => {

 const result = await PGpool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status)VALUES($1 , $2 , $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status])

 return result;

}


const GetVehicles = async () => {

            const result = await PGpool.query(`SELECT * FROM vehicles`)
            return result;

 


}

const GetSingleVehicles = async (vehicleId : string) => {

    const result = await PGpool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId])

    return result


}


const PutVehicles = async (vehicle_name : string , type : string, registration_number : string, daily_rent_price: number, availability_status : string, vehicleId : string ) => {
        const result = await PGpool.query(`UPDATE vehicles SET 
        vehicle_name = COALESCE($1, vehicle_name),
        type = COALESCE($2, type),
        registration_number = COALESCE($3, registration_number),
        daily_rent_price = COALESCE($4, daily_rent_price),
        availability_status = COALESCE($5, availability_status) 
        WHERE id = $6 RETURNING *`, 
        [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId])

        return result
}

const deleteVehicles = async(vehicleId : string) => {
const result = await PGpool.query( `DELETE FROM vehicles WHERE id = $1`, [vehicleId])
return result;
}


export const VehiclesInfo = {
    PostVehicles,
    GetVehicles,
    GetSingleVehicles,
    PutVehicles,
    deleteVehicles
}