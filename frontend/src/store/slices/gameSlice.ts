import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  secretNumber: number | null;
  guessesLeft: number;
  guessHistory: number[];
  isGameOver: boolean;
  hasWon: boolean;
  message: string;
  currentScore: number;
  bestScore: number;
  newRecord: boolean;
}

const initialState: GameState = {
  secretNumber: null,
  guessesLeft: 10,
  guessHistory: [],
  isGameOver: false,
  hasWon: false,
  message: 'Guess a number between 1 and 10',
  currentScore: 0,
  bestScore: 0,
  newRecord: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startNewGame: (state) => {
      state.secretNumber = Math.floor(Math.random() * 10) + 1;
      state.guessesLeft = 10;
      state.guessHistory = [];
      state.isGameOver = false;
      state.hasWon = false;
      state.message = 'Guess a number between 1 and 10';
      state.currentScore = 0;
      state.newRecord = false;
    },
    
    makeGuess: (state, action: PayloadAction<number>) => {
      if (state.isGameOver) return;
      
      const guess = action.payload;
      state.guessesLeft -= 1;
      state.guessHistory.push(guess);
      
      if (guess === state.secretNumber) {
        state.hasWon = true;
        state.isGameOver = true;
        const score = calculateScore(state.guessesLeft);
        state.currentScore = score;
        state.message = `Correct! You won with ${state.guessesLeft} chances left.`;
        
        // Check if we beat personal best
        if (score > state.bestScore) {
          state.bestScore = score;
          state.newRecord = true;
          state.message = `New Record! Score: ${score}`;
        }
      } else if (state.guessesLeft === 0) {
        state.isGameOver = true;
        state.message = `Game Over. The number was ${state.secretNumber}.`;
      } else if (guess < state.secretNumber!) {
        state.message = 'Try a higher number';
      } else {
        state.message = 'Try a lower number';
      }
    },
    
    setBestScore: (state, action: PayloadAction<number>) => {
      state.bestScore = action.payload;
    },
    
    acknowledgeNewRecord: (state) => {
      state.newRecord = false;
    }
  },
});

// Helper function to calculate score based on guesses left
function calculateScore(guessesLeft: number): number {
  return guessesLeft * 100;
}

export const { startNewGame, makeGuess, setBestScore, acknowledgeNewRecord } = gameSlice.actions;
export default gameSlice.reducer;