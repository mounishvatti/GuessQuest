import express, { Request, Response, NextFunction } from "express";
import prisma from "../db";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    req.userId = (decoded as jwt.JwtPayload).userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

// 🟢 Submit a new score
//@ts-ignore
router.post("/", authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { value } = req.body;
    if (!value) return res.status(400).json({ error: "Score is required" });

    const newScore = await prisma.score.create({
      data: { value, userId: req.userId! }
    });

    res.json({ message: "Score saved!", score: newScore });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🟢 Get all scores for a user
//@ts-ignore
router.get("/", authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const scores = await prisma.score.findMany({
      where: { userId: req.userId! },
      orderBy: { date: "desc" }
    });

    res.json({ scores });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🟢 Get leaderboard (top 10 scores)
router.get("/leaderboard", async (req: Request, res: Response) => {
  try {
    const leaderboard = await prisma.score.findMany({
      orderBy: { value: "desc" },
      take: 10,
      include: { user: { select: { username: true } } }
    });

    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;