import { Request, Response } from "express";
import { BookingService } from "./service.booking";

const createBooking = async (req: Request, res: Response) => {
  try {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

    if (!customer_id || !vehicle_id || !rent_start_date || !rent_end_date) {
      return res.status(400).json({
        success: false,
        message: "customer_id, vehicle_id, rent_start_date, rent_end_date lagbe",
      });
    }

    const result = await BookingService.createBooking({
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
    });

    const { booking, vehicle } = result;

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: {
        id: booking.id,
        customer_id: booking.customer_id,
        vehicle_id: booking.vehicle_id,
        rent_start_date: booking.rent_start_date,
        rent_end_date: booking.rent_end_date,
        total_price: booking.total_price,
        status: booking.status,
        vehicle: {
          vehicle_name: vehicle.vehicle_name,
          daily_rent_price: vehicle.daily_rent_price,
        },
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};


const ViewAllBookings = async (req: Request, res: Response) => {
  try {
    const user: any = req.user;
    // console.log("Logged-in user => ", req.user);

    let rows;
    if (user.role === "admin") {
      rows = await BookingService.GetBookingAll();
    } else {
      rows = await BookingService.getBookingsByCustomerId(user.id);
    }

    return res.status(200).json({
      success: true,
      message: "Bookings fetched",
      data: rows,
    });

  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    console.log("booking id : ", bookingId);
    const { status } = req.body; 
    const user: any = req.user;

    console.log("user : " , user);

    if (!user) return res.status(401).json({ success:false, message: "Unauthorized" });

    // get booking 
    const booking = await BookingService.getBookingById(bookingId!);
    if (!booking) return res.status(404).json({ success:false, message: "Booking not found" });

   
    if (user.role === "customer") {
      if (String(booking.customer_id) !== String(user.id)) {
        return res.status(403).json({ success:false, message: "You can only change your own bookings" });
      }
      if (status !== "cancelled") {
        return res.status(403).json({ success:false, message: "Customers can only cancel bookings" });
      }
      const now = new Date();
      if (now >= new Date(booking.rent_start_date)) {
        return res.status(400).json({ success:false, message: "Cannot cancel on/after start date" });
      }
    }

    const updated = await BookingService.updateStatusAndVehicle(bookingId !, status);

    return res.status(200).json({ success:true, message: "Status updated", data: updated });

  } catch (err: any) {
    return res.status(500).json({ success:false, message: err.message || "Server error" });
  }
};

export const BookingController = {
  createBooking,
  ViewAllBookings,
  updateBookingStatus
};
