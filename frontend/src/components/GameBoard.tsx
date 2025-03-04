import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  startNewGame,
  makeGuess,
  acknowledgeNewRecord,
  setBestScore,
} from "../store/slices/gameSlice";
import * as gameService from "../services/gameService";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Rotate3D, RefreshCcw, Trophy, Target } from "lucide-react";
import CelebrationEffect from "./CelebrationEffect";
import { RootState } from "@/store";

const GameBoard: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const {
    secretNumber,
    guessesLeft,
    guessHistory,
    isGameOver,
    hasWon,
    message,
    currentScore,
    bestScore,
    newRecord,
  } = useSelector((state: RootState) => state.game);

  const [isLoading, setIsLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Redirect to /auth if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

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
      const scores = await gameService.getUserScores();
      if (scores.length > 0) {
        const bestScore = Math.max(...scores);
        dispatch(setBestScore(bestScore));
      }
    } catch (error) {
      console.error("Failed to load user scores", error);
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
      // Save score to backend
      const response = await gameService.saveScore({ value: currentScore });

      // Update user's best score if current score is higher
      if (currentScore > bestScore) {
        dispatch(setBestScore(currentScore));
      }
      toast.success("Saved score");
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to save score");
      console.error(error);
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

      let buttonClass = "number-button ";
      if (isCorrect) {
        buttonClass += "number-button-correct";
      } else if (isGuessed) {
        buttonClass += "number-button-incorrect";
      } else if (isGameOver) {
        buttonClass += "number-button-inactive";
      } else {
        buttonClass += "number-button-active";
      }

      buttons.push(
        <Button
          key={i}
          onClick={() => handleGuess(i)}
          disabled={isGuessed || isGameOver}
          className={`${buttonClass} text-lg py-4 px-6`}
          aria-label={`Guess number ${i}`}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-yellow-400 to-white via-white">
      <div className="w-full max-w-lg mx-auto relative place-content-center">
        {showCelebration && <CelebrationEffect />}
        {isAuthenticated && <p className="text-center text-2xl font-serif">Welcome back, {user.name}!</p>}
        <img src="/think.svg" alt="Number Quest" className="w-72 mx-auto" />
        <Card className="glass-panel overflow-hidden p-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="font-light tracking-tight font-serif text-2xl">
                Number Quest
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant="default" className="flex items-center gap-1 text-sm">
                  <Target size={18} />
                  Guesses Left: {guessesLeft}
                </Badge>
                {bestScore > 0 && (
                  <Badge variant="neutral" className="flex items-center gap-1 text-sm">
                    <Trophy size={18} />
                    Best: {bestScore}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="text-center mb-6 font-serif">
              <p
                className={`text-xl font-medium ${
                  newRecord ? "text-primary animate-pulse-scale" : ""
                }`}
              >
                {message}
              </p>
            </div>

            <div className="grid grid-cols-5 gap-4 justify-items-center mb-6">
              {renderNumberButtons()}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            {isGameOver && (
              <div className="flex flex-col gap-4 w-full">
                {hasWon && (
                  <Button
                    onClick={handleSaveScore}
                    variant="noShadow"
                    disabled={isLoading}
                    className="w-full text-lg py-4"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Rotate3D className="animate-spin" size={24} />
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Trophy size={24} />
                        Save Score
                      </span>
                    )}
                  </Button>
                )}
                <Button onClick={handlePlayAgain} className="w-full text-lg py-4">
                  <RefreshCcw size={24} className="mr-2" />
                  Play Again
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default GameBoard;
