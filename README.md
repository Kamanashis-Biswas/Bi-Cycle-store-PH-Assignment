# Bicycle Store Application | ASSIGNMENT-04

A bicycle store application that enables users to register, browse a wide selection of bicycles, place orders, and make secure payments. Customers can manage their profiles, view order history, and track deliveries. Admins have the ability to manage user accounts, update product listings, and oversee order processing. The app is fully responsive, ensuring a seamless experience across devices, and integrates with a secure payment gateway for safe and convenient transactions.

## Technologies Used

### **Frontend:**

- React.js
- Redux Toolkit
- Tailwind CSS
- ShadCN UI

### **Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)

### **Other Tools:**

- SurjoPay
- Cloudinary

## Project Structure

### 1. User Registration & Authentication

- **Secure Registration & Login**
- **Role-Based Authentication**
- **JWT Authentication**
- **Logout**

### 2. Public Routes

- **Home Page**
- **All Bicycles Page**
- **Bicycle Details Page**
- **About Page**

### 3. Private Routes

- **Checkout Page**
- **Dashboard**:
  - **Admin Dashboard**
  - **User Dashboard**

## Backend Requirements

- **Database**
- **Authentication**
- **Product Management**
- **Order Management**
- **Payment Integration**
- **Error Handling**
- **Authentication Middleware**

## Project Link

### Front End Link: - **https://ph-assignment-04-cc3003.netlify.app/**

### Backend End Link: - **https://ph-assignment-04.vercel.app/**

### Admin Credentials

```
Email : admin@gmail.com
Password : admin@123

```

## Client Project Setup

1. Clone the repository

   ```
   git clone https://github.com/Kamanashis-Biswas/Bi-Cycle-store-PH-Assignment.git

   ```

2. Install dependencies:

   ```
   cd Client
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following content:

   ```
   VITE_REACT_APP_SERVER_URI=<your server api>
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Server Project Setup

1. Clone the repository

   ```
   git clone https://github.com/Kamanashis-Biswas/Bi-Cycle-store-PH-Assignment.git

   ```

2. Install dependencies:

   ```
   cd Server
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following content:

   ```
   NODE_ENV=production
   PORT=
   DATABASE_URL=
   BCRYPT_SALT_ROUNDS=10
   DEFAULT_PASS=
   JWT_ACCESS_SECRET=
   JWT_REFRESH_SECRET=
   JWT_ACCESS_EXPIRES_IN=10d
   JWT_REFRESH_EXPIRES_IN=365d
   ```

4. Start the development server:
   ```
   npm run start:dev
   ```
