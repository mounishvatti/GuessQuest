import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import scoreRoutes from "./routes/score.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from backend!");
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));