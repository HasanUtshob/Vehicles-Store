import { Router } from "express";
import { route } from "../User/route.user";
import { BookingController } from "./controller.booking";
import auth from "../middleware/auth";

export const BookingsRoute = Router();

BookingsRoute.post("/",auth("admin", "customer"),BookingController.createBooking)
BookingsRoute.get("/",auth("admin", "customer"), BookingController.ViewAllBookings)
BookingsRoute.put("/:bookingId",auth("admin", "customer"), BookingController.updateBookingStatus);