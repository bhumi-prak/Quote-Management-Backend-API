import express from "express";
import cors from "cors";
import morgan from "morgan";

import quoteRoutes from "./routes/quote.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Quote Management API is Running 🚀",
  });
});

// Quote Routes
app.use("/quotes", quoteRoutes);

export default app;