# Restaurant ChatBot

## Overview

This project is a restaurant chatbot built with Node.js, Express, and MongoDB. It assists customers in placing orders for meals, tracking order history, and managing current orders through a chat interface.

## Features

- Chat interface for customer interaction.
- Options for placing orders, checking out, viewing order history, seeing the current order, and canceling orders.
- Order management with persistent storage using MongoDB.
- Session management to track orders based on user sessions.

## Project Structure

restaurant-chatbot/
│
├── config/
│ └── config.js
├── controllers/
│ └── chatbotController.js
├── models/
│ └── orderModel.js
├── routes/
│ └── chatbotRoutes.js
├── views/
│ └── index.html
├── middleware/
│ └── sessionMiddleware.js
├── utils/
│ └── order.selection.js.js
├── .env
├── app.js
├── package.json
└── README.md


## Setup and Installation

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository:**

```
git clone https://github.com/yourusername/restaurant-chatbot.git
cd restaurant-chatbot
```

2. **Install dependencies:**
```
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the root directory with the following content:

E.g
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
LOCAL_HOST=localhost
NODE_ENV=development
```

4. **Start the MongoDB server:**
<br>

5. **Run the application:**


### API Endpoints

#### Chatbot Routes

- **`GET /api/chatbot/options`**: Returns initial chatbot options.
- **`POST /api/chatbot/chat`**: Handles user input and returns the chatbot response.

### Code Explanation

#### Database Connection

**config/config.js**: MongoDB connection setup.

#### Order Model

**models/orderModel.js**: Mongoose schema for Order.

#### Chatbot Controller

**controllers/chatbotController.js**: Chatbot logic and response handling.

#### Chatbot Routes

**routes/chatbotRoutes.js**: Express routes for the chatbot API.

#### Session Middleware

**middleware/sessionMiddleware.js**: Middleware for session management.

### Frontend

**views/index.html**: Frontend HTML for the chatbot interface.

### Running the Project

1. **Ensure MongoDB is running**.
2. **Start the Node.js server** using `npm start`.
3. **Open your browser** and navigate to `http://localhost:3000` to interact with the chatbot.

## Conclusion

This project demonstrates a basic implementation of a restaurant chatbot using Node.js, Express, and MongoDB. It provides a chat interface for customers to interact with, enabling them to place orders, view order history, and manage current orders effectively.



