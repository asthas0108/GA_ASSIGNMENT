# 💼 Virtual Deal Room

A full-stack web application that facilitates secure deal-making between buyers and sellers. The platform supports user authentication, real-time chat, deal tracking, and payment integration using Razorpay.

## 🌐 Tech Stack

| Layer        | Tech Used                             |
|--------------|----------------------------------------|
| Frontend     | React.js, Redux Toolkit, Tailwind CSS |
| Backend      | Node.js, Express.js, JWT              |
| Real-time    | Socket.io                             |
| Database     | MongoDB + Mongoose                    |
| Payment      | Razorpay API                          |
| Deployment   | Render (backend), Vercel (frontend)   |

---

## 🔄 Features & Workflow

### 1. 🧾 Authentication
- Register/Login as **Buyer** or **Seller**
- JWT token stored in Redux & used in protected routes

### 2. 📃 Deal Lifecycle
- Buyer fills **Deal Form** (title, price, seller)
- Seller sees list of deals assigned to them
- Seller can **Accept** (status: In Progress) or **Reject** (status: Cancelled)

### 3. 💬 Real-Time Chat
- Once accepted, **Buyer and Seller** can communicate in a **Socket.io-powered ChatBox**
- Messages are stored in MongoDB and synced live using socket rooms

### 4. 💳 Razorpay Payment (Final Phase)
- After negotiation, Buyer proceeds to payment
- Razorpay Checkout is launched; payment verified server-side

### 5. 📊 Admin Panel (Optional Extension)
- View stats: total users, deals, and revenue
- Only accessible to users with role `"admin"`

---

## 🗂️ Project Structure

## 📁 Folder Structure

```plaintext
virtual-deal-room/
├── client/                     # Frontend React App
│   ├── src/
│   │   ├── components/         # ChatBox, DealForm, Navbar, etc.
│   │   ├── features/           # Redux Toolkit slices, RTK Query setup
│   │   ├── pages/              # Login.jsx, Register.jsx, Home.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── tailwind.config.js      # Tailwind CSS configuration
│
├── server/                     # Backend Node/Express App
│   ├── controllers/            # Logic for deals, chat, auth, etc.
│   ├── models/                 # Mongoose schemas (User, Deal, Message)
│   ├── routes/                 # API route files
│   ├── middlewares/            # Auth and error handlers
│   ├── config/                 # Database and Redis configs
│   ├── uploads/                # File upload storage (optional)
│   └── index.js                # Express server and Socket.IO setup
│
├── .env                        # Environment variables
├── package.json                # Project metadata
└── README.md                   # Project documentation
```


## API Endpoints

### Auth Endpoints

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login`    | Login and receive JWT |


### Deal Endpoints

| Method | Endpoint                | Role(s)       | Description                        |
| ------ | ----------------------- | ------------- | ---------------------------------- |
| POST   | `/api/deals`            | Buyer         | Create a new deal                  |
| GET    | `/api/deals`            | Buyer, Seller | Fetch all related deals            |
| PUT    | `/api/deals/:id/status` | Seller        | Update deal status (Accept/Reject) |


### Chat Endpoints

| Method | Endpoint            | Role(s)       | Description                        |
| ------ | ------------------- | ------------- | ---------------------------------- |
| POST   | `/api/chat/send`    | Buyer, Seller | Send a chat message in a deal room |
| GET    | `/api/chat/:dealId` | Buyer, Seller | Get all messages for a given deal  |


### Payment Endpoints

| Method | Endpoint                    | Role(s) | Description                     |
| ------ | --------------------------- | ------- | ------------------------------- |
| POST   | `/api/payment/create-order` | Buyer   | Create a Razorpay payment order |
| POST   | `/api/payment/verify`       | Buyer   | Verify and confirm the payment  |


## 📸 Screenshots

### 🔐 Authentication
![Authentication](./screenshots/auth.png)

### 💬 Dashboard for Buyer & Seller
![Dashboard](./screenshots/dashboard.png)


## Demo Video

### Negotiation and Payment

[Demo Video](https://drive.google.com/file/d/1A4rb8J7BnaluGCNBHF9hCOGjU7UYGrzZ/view?usp=sharing)
