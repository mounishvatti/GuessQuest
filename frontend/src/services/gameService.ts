import { LeaderboardEntry } from '../store/slices/leaderboardSlice';

// Mock leaderboard storage
const LEADERBOARD_KEY = 'number_game_leaderboard';
const USER_SCORES_KEY = 'number_game_user_scores';

export interface UserScore {
  userId: string;
  bestScore: number;
}

// Get leaderboard from local storage
export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const leaderboard = localStorage.getItem(LEADERBOARD_KEY);
  return leaderboard ? JSON.parse(leaderboard) : [];
};

// Save a new score to the leaderboard
export const saveScore = async (entry: Omit<LeaderboardEntry, 'timestamp'>): Promise<LeaderboardEntry> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newEntry: LeaderboardEntry = {
    ...entry,
    timestamp: Date.now()
  };
  
  const leaderboard = await getLeaderboard();
  
  // Add the new entry
  leaderboard.push(newEntry);
  
  // Sort by score (highest first)
  leaderboard.sort((a, b) => b.score - a.score);
  
  // Keep only the top 10 entries
  const top10 = leaderboard.slice(0, 10);
  
  // Save back to localStorage
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top10));
  
  return newEntry;
};

// Get a user's best score
export const getUserBestScore = async (userId: string): Promise<number> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const userScores = localStorage.getItem(USER_SCORES_KEY);
  const scores: UserScore[] = userScores ? JSON.parse(userScores) : [];
  
  const userScore = scores.find(score => score.userId === userId);
  return userScore ? userScore.bestScore : 0;
};

// Update a user's best score
export const updateUserBestScore = async (userId: string, score: number): Promise<void> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const userScores = localStorage.getItem(USER_SCORES_KEY);
  const scores: UserScore[] = userScores ? JSON.parse(userScores) : [];
  
  const existingScoreIndex = scores.findIndex(score => score.userId === userId);
  
  if (existingScoreIndex >= 0) {
    // Only update if the new score is higher
    if (score > scores[existingScoreIndex].bestScore) {
      scores[existingScoreIndex].bestScore = score;
    }
  } else {
    // Add new user score
    scores.push({ userId, bestScore: score });
  }
  
  localStorage.setItem(USER_SCORES_KEY, JSON.stringify(scores));
};