import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserScores, UserScore } from "../services/gameService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const UserProfile: React.FC = () => {
  const [scores, setScores] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const data = await getUserScores();
        setScores(data);
      } catch (error) {
        console.error("Failed to fetch user scores", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-yellow-400 to-white via-white">
        <img src="/userscore.svg" alt="GuessQuest" className="w-96 mx-auto" />
      <Card className="glass-panel w-full max-w-md mx-auto h-[400px] max-h-[70vh]">
        <CardHeader>
          <CardTitle className="font-light tracking-tight flex items-center gap-2">
            {user.name}'s Scores
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-[300px]">
              <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : scores.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No scores yet. Play a game to see your scores here!
            </div>
          ) : (
            <ScrollArea className="h-[300px] pr-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2 font-medium text-lg">Score</th>
                    <th className="text-right pb-2 font-medium text-lg">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score) => (
                    <tr key={score.date} className="border-b border-border/30">
                      <td className="py-3 font-serif">{score.value}</td>
                      <td className="py-3 text-right text-muted-foreground text-sm font-serif">
                        {new Date(score.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;