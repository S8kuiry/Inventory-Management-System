# 📦 Smart Inventory Management System

A high-performance, full-stack inventory management solution. This application features a modern **Next.js** frontend with secure **Clerk Authentication** and a robust **Spring Boot** backend integrated with **MongoDB Atlas** for cloud data persistence.

---

## 🌐 Live Deployment
* **Frontend Interface:** [https://inventory-management-system-l0tst2ai8-subharthys-projects.vercel.app/](https://inventory-management-system-l0tst2ai8-subharthys-projects.vercel.app/)

---

## 🚀 Key Features
* **Secure Authentication:** Integrated with Clerk for seamless user sign-in and protected routes.
* **User-Specific Data:** Products are mapped to individual Clerk User IDs, ensuring data privacy.
* **Dynamic Dashboard:** Real-time data visualization using Recharts for stock analytics.
* **Cloud Native:** Fully hosted on Vercel (Frontend), Render (Backend), and MongoDB Atlas (Database).
* **Responsive UI:** Crafted with Tailwind CSS for a flawless experience on mobile, tablet, and desktop.

---

## 🛠 Tech Stack

### Frontend (Client)
* **Framework:** Next.js 14+ (App Router)
* **Auth:** Clerk (Identity Management)
* **Styling:** Tailwind CSS & Lucide React
* **Data Fetching:** Axios / Fetch API
* **Deployment:** Vercel

### Backend (Server)
* **Language:** Java 17
* **Framework:** Spring Boot 4.0.2
* **Database:** MongoDB Atlas (NoSQL Cloud)
* **Build Tool:** Maven (mvnw)
* **Deployment:** Render

---

## ⚙️ Local Setup Instructions

### 1. Prerequisites
* Node.js (v18+)
* JDK 17
* MongoDB Atlas Account (with 0.0.0.0/0 Whitelist)

### 2. Backend Configuration
Navigate to the `server` directory and configure `src/main/resources/application.properties`:
```properties
spring.application.name=mongodbexample
# Primary Atlas Connection
spring.mongodb.uri=mongodb+srv://subharthykuiry_db_user:1234@cluster0.7a2pskh.mongodb.net/inventory_db?retryWrites=true&w=majority
