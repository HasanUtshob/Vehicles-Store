// scheduler.ts — চালাবে node-cron বা যেকোনো scheduler
import cron from "node-cron";
import { PGpool } from "./config/Db";
import { BookingService } from "./Bookings/service.booking";

// প্রতিদিন মধ্যরাতে একবার চালাবা (cron expression: 0 0 * * *)
cron.schedule("0 0 * * *", async () => {
  try {
    // খুঁজে নেওয়া: active bookings যেগুলোর rent_end_date আগেই গেছে
    const res = await PGpool.query(
      `SELECT id FROM bookings WHERE status = 'active' AND rent_end_date <= NOW()`
    );
    const rows = res.rows || [];
    for (const r of rows) {
      await BookingService.updateStatusAndVehicle(r.id, "returned");
    }
    console.log("Auto-return processed:", rows.length);
  } catch (e) {
    console.error("Auto-return error:", e);
  }
});
