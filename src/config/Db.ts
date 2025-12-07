
import { Pool } from "pg";
import config from ".";

// Db
export const PGpool = new Pool({
    connectionString : config.PG_Connection
})

export const initDB = async () => {

  // Users
  await PGpool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,

      email VARCHAR(200) NOT NULL,
      CONSTRAINT chk_email_lower CHECK (email = LOWER(email)),
      CONSTRAINT uq_users_email UNIQUE (email),

      password VARCHAR(250) NOT NULL,
      CONSTRAINT chk_pass_length CHECK (LENGTH(password) >= 6),

      phone VARCHAR(50) NOT NULL,

      role VARCHAR(15) NOT NULL
      DEFAULT 'customer'
      CHECK (role IN ('admin', 'customer'))
    );
  `);

  // Vehicles
  await PGpool.query(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,

      vehicle_name VARCHAR(150) NOT NULL,

      type VARCHAR(10) NOT NULL
      CHECK (type IN ('car', 'bike', 'van', 'SUV')),

      registration_number VARCHAR(50) NOT NULL UNIQUE,

      daily_rent_price NUMERIC NOT NULL
      CHECK (daily_rent_price > 0),

      availability_status VARCHAR(15) NOT NULL
      DEFAULT 'available'
      CHECK (availability_status IN ('available', 'booked'))
    );
  `);

  // Bookings
  await PGpool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,

      customer_id INT NOT NULL
      REFERENCES users(id)
      ON DELETE CASCADE,

      vehicle_id INT NOT NULL
      REFERENCES vehicles(id)
      ON DELETE CASCADE,

      rent_start_date DATE NOT NULL,

      rent_end_date DATE NOT NULL,
      CHECK (rent_end_date > rent_start_date),

      total_price NUMERIC NOT NULL
      CHECK (total_price > 0),

      status VARCHAR(20) NOT NULL
      DEFAULT 'active'
      CHECK (status IN ('active', 'cancelled', 'returned'))
    );
  `);

}






