import express, { Request, Response } from "express";
import prisma from "../db";
import authenticate from "../middleware/middleware";
interface AuthenticatedRequest extends Request {
  userId?: string;
}

const router = express.Router();

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