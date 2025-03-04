import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '@/store';
import { getLeaderboard } from '@/services/gameService';

export interface LeaderboardEntry {
  id: string;
  user: {
    username: string;
  }
  value: number;
  date: string;
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

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    fetchLeaderboardStart: (state) => {
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
      state.entries.sort((a, b) => b.value - a.value);
      // Keep only top 10
      state.entries = state.entries.slice(0, 10);
    },
  },
});

export const {
  fetchLeaderboardStart,
  fetchLeaderboardSuccess,
  fetchLeaderboardFailure,
  addLeaderboardEntry,
} = leaderboardSlice.actions;

export const fetchLeaderboard = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchLeaderboardStart());
    const leaderboard = await getLeaderboard();
    dispatch(fetchLeaderboardSuccess(leaderboard));
  } catch (error) {
    //@ts-ignore
    dispatch(fetchLeaderboardFailure(error.toString()));
  }
};

export default leaderboardSlice.reducer;