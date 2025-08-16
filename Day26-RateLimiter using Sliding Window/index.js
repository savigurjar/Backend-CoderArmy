// Load environment variables first
require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const redisClient = require("./config/redis");
const main = require("./database");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Middleware
app.use(rateLimiter);

// Routes
app.use("/auth", authRouter);
app.use("/user", userRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// Initialize connections and start server
const initializeConnection = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    await main();
    console.log("Connected to Redis and Database");

    app.listen(process.env.PORT, () => {
      console.log(` Server is running at port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error(" Connection Error:", err);
    process.exit(1);
  }
};

initializeConnection();
