import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import scoreRoutes from "./routes/score.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Whitelisted origins
const whitelist = ["http://localhost:5173", "https://guessquestgame.netlify.app/"];

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if(!origin || whitelist.indexOf(origin) !== -1){
            callback(null, true);
        } else{
            callback(new Error("Not allowed by CORS"));
        }
    },
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from backend!");
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));