# 🚗 Vehicles Store – Backend API

**Live URL:** [https://assignment-2-l2-pied.vercel.app/](https://assignment-2-l2-pied.vercel.app/)

Vehicles Store is a powerful backend API built for managing a complete **vehicle rental management system**. It handles vehicle inventory, customer accounts, secure authentication, and booking operations with automated cost calculation.

This project is designed with scalability, security, and clean architecture in mind, making it suitable for real-world rental platforms.

---

## ✨ Key Features

### 🔹 Vehicles Management

* Manage vehicle inventory
* Track real-time availability status (available / booked)
* Set daily rental pricing

### 🔹 Customers Management

* Create and manage customer accounts
* Secure profile handling

### 🔹 Bookings System

* Rent vehicles with start & end dates
* Automatic total cost calculation
* Handle booking status (active, cancelled, returned)
* Vehicle availability auto-update on booking & return

### 🔹 Authentication & Authorization

* Secure JWT-based authentication
* Role-based access control:

  * **Admin** – Full system access
  * **Customer** – Booking & profile access
* Encrypted password storage

---

## 🛠 Technology Stack

* **Node.js** – Backend runtime
* **TypeScript** – Type-safe development
* **Express.js** – Web framework
* **PostgreSQL** – Relational database
* **bcrypt** – Secure password hashing
* **jsonwebtoken (JWT)** – Authentication & authorization

---

## 📦 API Capabilities Overview

| Module   | Capabilities                                   |
| -------- | ---------------------------------------------- |
| Users    | Create, update, delete, view users             |
| Vehicles | Add, update, remove, list vehicles             |
| Bookings | Create booking, return vehicle, cancel booking |
| Auth     | Signup, login, token-based security            |

---

## 🔐 Security Highlights

* Passwords are never stored in plain text
* JWT tokens are used for protected routes
* Role-based access ensures proper authorization
* SQL injection protected using parameterized queries

---

## 🚀 Future Enhancements

* Payment gateway integration
* Vehicle image upload system
* Advanced search & filtering
* Booking history reports
* Admin dashboard analytics

---

## 👨‍💻 Developer

Developed with ❤️ using Node.js & TypeScript as part of a backend assignment project.

---

## ✅ Live Preview

👉 **Live API Base URL:** [https://assignment-2-l2-pied.vercel.app/](https://assignment-2-l2-pied.vercel.app/)

---

If you have any feedback or suggestions, feel free to reach out. Happy coding! 🚀
