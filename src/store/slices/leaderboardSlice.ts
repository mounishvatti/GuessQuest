import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  timestamp: number;
}

interface LeaderboardState {
  entries: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: LeaderboardState = {
  entries: [],
  loading: false,
  error: null,
};

// For now, we'll mock the leaderboard in the store
// Later we'll connect to a real backend
const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    fetchLeaderboard: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    fetchLeaderboardSuccess: (state, action: PayloadAction<LeaderboardEntry[]>) => {
      state.entries = action.payload;
      state.loading = false;
    },
    
    fetchLeaderboardFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    addLeaderboardEntry: (state, action: PayloadAction<LeaderboardEntry>) => {
      state.entries.push(action.payload);
      // Sort by score in descending order
      state.entries.sort((a, b) => b.score - a.score);
      // Keep only top 10
      state.entries = state.entries.slice(0, 10);
    },
  },
});

export const {
  fetchLeaderboard,
  fetchLeaderboardSuccess,
  fetchLeaderboardFailure,
  addLeaderboardEntry,
} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;