import { PGpool } from "../config/Db";

interface CreateBookingPayload{
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
};

const createBooking = async ({
  customer_id,
  vehicle_id,
  rent_start_date,
  rent_end_date,
}: CreateBookingPayload) => {

  const customerResult = await PGpool.query(
    `SELECT id FROM users WHERE id = $1`,
    [customer_id]
  );

  if (customerResult.rowCount === 0) {
    throw new Error("Invalid customer_id. Ei ID diye kono user nai.");
  }

 
  const vehicleResult = await PGpool.query(
    `SELECT * FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicleResult.rowCount === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleResult.rows[0];

  if (vehicle.availability_status !== "available") {
    throw new Error("Vehicle is not available for booking");
  }


  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  const diff = end.getTime() - start.getTime();
  const totalDays = diff / (1000 * 60 * 60 * 24);

  if (totalDays <= 0) {
    throw new Error("rent_end_date must be after rent_start_date");
  }


  const totalPrice = totalDays * Number(vehicle.daily_rent_price);

 
  const bookingResult = await PGpool.query(
    `INSERT INTO bookings(
      customer_id, 
      vehicle_id, 
      rent_start_date, 
      rent_end_date,
      total_price, 
      status
    )
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice,
      "active",
    ]
  );

  
  await PGpool.query(
    `UPDATE vehicles 
     SET availability_status = 'booked'
     WHERE id = $1`,
    [vehicle_id]
  );

  const booking = bookingResult.rows[0];


  return {
    booking,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

const GetBookingAll = async () => {
  const result = await PGpool.query("SELECT * FROM bookings");
  return result.rows;
};

const getBookingsByCustomerId = async (customerId: any) => {
  const result = await PGpool.query(
    "SELECT * FROM bookings WHERE customer_id = $1",
    [customerId]
  );

  // if(result.rows.length === 0){
    
  //  throw new Error("Nothing data");
     
  // }


  return result.rows;
};


const getBookingById = async (bookingId: string) => {
  const r = await PGpool.query("SELECT * FROM bookings WHERE id = $1", [bookingId]);
  return (r.rows && r.rows[0]) || null;
};


const updateStatusAndVehicle = async (bookingId: string, status: string) => {
  // update booking status
  const upd = await PGpool.query(
    `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`,
    [status, bookingId]
  );
  const booking = (upd.rows && upd.rows[0]) || null;


  if (booking) {
    const vehicleId = booking.vehicle_id;
    if (status === "cancelled" || status === "returned") {
      await PGpool.query(`UPDATE vehicles SET availability_status = 'available' WHERE id = $1`, [vehicleId]);
    } else if (status === "active") {
      await PGpool.query(`UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`, [vehicleId]);
    }
  }

  return booking;
};





export const BookingService = {
  createBooking,
  GetBookingAll,
  getBookingsByCustomerId,
  getBookingById,
  updateStatusAndVehicle
};