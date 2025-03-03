React Game with Redux & Backend Integration 🎮

Overview

This is a simple game built using React.js and Redux, with a Node.js + Express backend for user authentication and score tracking. The project is managed using pnpm workspaces to keep frontend and backend in a monorepo.

Tech Stack

Frontend (React + Vite)
	•	React.js (Vite for fast builds)
	•	Redux Toolkit (State Management)
	•	React Router (Navigation)
	•	Tailwind CSS (Styling)

Backend (Node.js + Express)
	•	Express.js (Server)
	•	MongoDB / PostgreSQL (Database)
	•	JWT (Authentication)
	•	bcrypt.js (Password Hashing)
	•	CORS (Cross-Origin Requests)

Package Management
	•	pnpm (for efficient dependency management & workspaces)

Project Structure

game/
├── frontend/       # React frontend (Vite + Redux)
├── backend/        # Node.js backend (Express + Database)
├── pnpm-workspace.yaml  # pnpm workspace configuration
├── package.json    # Root package.json (pnpm workspace)
└── README.md       # Project documentation

Features

✅ Play an interactive game 🎮
✅ Track & persist high scores 📊
✅ JWT-based authentication 🔐
✅ Redux-powered state management ⚡
✅ Backend API for user data & scores 🚀
✅ Responsive UI with Tailwind CSS ✨

API Endpoints (Backend)

Method	Endpoint	Description
POST	/api/auth/register	User registration
POST	/api/auth/login	User login
GET	/api/scores	Fetch user scores
POST	/api/scores	Submit new score

Deployment
	•	Frontend → Vercel / Netlify
	•	Backend → Railway / Render / Heroku

License

This project is licensed under the MIT License.