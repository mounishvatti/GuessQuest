
import axios from "axios";
import {BACKEND_URL} from "@/constants"
export interface UserScore {
  value: number;
  date: string;
  userId: string;
  bestScore: number;
}

export const saveScore = async (scoreData: { value: number }) => {
  const res = await axios.post(`${BACKEND_URL}/api/scores`, scoreData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};


export const getUserScores = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/scores`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data.scores;
};

export const getLeaderboard = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/scores/leaderboard`);
  return response.data.leaderboard;
};