import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startNewGame, makeGuess, acknowledgeNewRecord } from '../store/slices/gameSlice';
import { addLeaderboardEntry } from '../store/slices/leaderboardSlice';
import * as gameService from '../services/gameService';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Rotate3D, RefreshCcw, Trophy, Target } from 'lucide-react';
import CelebrationEffect from './CelebrationEffect';

const GameBoard: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { 
    secretNumber, 
    guessesLeft, 
    guessHistory, 
    isGameOver, 
    hasWon, 
    message, 
    currentScore, 
    bestScore, 
    newRecord 
  } = useSelector((state) => state.game);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Start a new game when component mounts
  useEffect(() => {
    if (!secretNumber) startGame();
  }, [secretNumber]);
  
  // Load user's best score
  useEffect(() => {
    if (user) {
      loadUserScore();
    }
  }, [user]);
  
  // Show celebration when new record is achieved
  useEffect(() => {
    if (newRecord) {
      setShowCelebration(true);
      const timer = setTimeout(() => {
        setShowCelebration(false);
        dispatch(acknowledgeNewRecord());
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [newRecord, dispatch]);
  
  const loadUserScore = async () => {
    if (!user) return;
    
    try {
      const score = await gameService.getUserBestScore(user.id);
      if (score > 0) {
        dispatch({ type: 'game/setBestScore', payload: score });
      }
    } catch (error) {
      console.error('Failed to load user score', error);
    }
  };
  
  const startGame = () => {
    dispatch(startNewGame());
  };
  
  const handleGuess = async (num: number) => {
    if (isGameOver) return;
    
    dispatch(makeGuess(num));
  };
  
  const handlePlayAgain = () => {
    startGame();
  };
  
  const handleSaveScore = async () => {
    if (!user || !hasWon) return;
    
    setIsLoading(true);
    try {
      // Update user's best score if current score is higher
      if (currentScore > bestScore) {
        await gameService.updateUserBestScore(user.id, currentScore);
      }
      
      // Save to leaderboard
      const leaderboardEntry = await gameService.saveScore({
        id: Date.now().toString(),
        username: user.username,
        score: currentScore,
      });
      
      dispatch(addLeaderboardEntry(leaderboardEntry));
      toast.success('Score saved to leaderboard!');
    } catch (error) {
      toast.error('Failed to save score');
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  };
  
  // Generate number buttons (1-10)
  const renderNumberButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 10; i++) {
      const isGuessed = guessHistory.includes(i);
      const isCorrect = hasWon && i === secretNumber;
      
      let buttonClass = 'number-button ';
      if (isCorrect) {
        buttonClass += 'number-button-correct';
      } else if (isGuessed) {
        buttonClass += 'number-button-incorrect';
      } else if (isGameOver) {
        buttonClass += 'number-button-inactive';
      } else {
        buttonClass += 'number-button-active';
      }
      
      buttons.push(
        <button
          key={i}
          onClick={() => handleGuess(i)}
          disabled={isGuessed || isGameOver}
          className={buttonClass}
          aria-label={`Guess number ${i}`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };
  
  return (
    <div className="w-full max-w-md mx-auto relative">
      {showCelebration && <CelebrationEffect />}
      
      <Card className="glass-panel overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-light tracking-tight">Number Quest</CardTitle>
            <div className="flex gap-2">
              <Badge variant="neutral" className="flex items-center gap-1">
                <Target size={14} />
                Guesses Left: {guessesLeft}
              </Badge>
              {bestScore > 0 && (
                <Badge variant="neutral" className="flex items-center gap-1">
                  <Trophy size={14} />
                  Best: {bestScore}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="text-center mb-6">
            <p className={`text-lg font-medium ${newRecord ? 'text-primary animate-pulse-scale' : ''}`}>
              {message}
            </p>
          </div>
          
          <div className="grid grid-cols-5 gap-3 justify-items-center mb-6">
            {renderNumberButtons()}
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-3">
          {isGameOver && (
            <div className="flex flex-col gap-3 w-full">
              {hasWon && (
                <Button 
                  onClick={handleSaveScore} 
                  variant="noShadow"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Rotate className="animate-spin" size={18} />
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Trophy size={18} />
                      Save Score
                    </span>
                  )}
                </Button>
              )}
              <Button onClick={handlePlayAgain} className="w-full">
                <RefreshCcw size={18} className="mr-2" />
                Play Again
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default GameBoard;