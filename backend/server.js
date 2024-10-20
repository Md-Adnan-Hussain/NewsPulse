import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import newsRoutes from "./routes/newsRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/news", newsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
