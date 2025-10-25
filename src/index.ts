import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import IBaseUserRoutes from "./routes/IBaseUserRoutes";
import ExcelDiseaseRoutes from "./routes/excelDiseaseRoutes"

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users/", userRoutes,);
app.use("/api", IBaseUserRoutes);
app.use("/api/excel/", ExcelDiseaseRoutes);

// DB + Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
