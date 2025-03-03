import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../db.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// 🟢 Register a new user
//@ts-ignore
router.post("/register", async (req, res) => {
  try {
    const { name, username, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: { name, username, password: hashedPassword }
    });

    res.json({ message: "User registered successfully!", user: newUser.name, created_at: newUser.createdAt });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🟢 Login user
//@ts-ignore
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "2d" });

    res.json({ message: "Login successful", 
      token, 
      user: { id: user.id, name: user.name, username: user.username }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;