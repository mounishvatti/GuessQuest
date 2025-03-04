import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../services/gameService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Medal, Award, User } from "lucide-react";

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Get medal for top 3 positions
  const getMedal = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy size={20} className="text-amber-500 animate-pulse-scale" />;
      case 1:
        return <Medal size={20} className="text-zinc-500" />;
      case 2:
        return <Award size={20} className="text-amber-700" />;
      default:
        return <User size={20} className="text-zinc-700" />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-yellow-400 to-white via-white">
      <img src="/communication.svg" alt="GuessQuest" className="w-96 mx-auto" />
      <Card className="glass-panel w-full max-w-md mx-auto h-[400px] max-h-[70vh]">
        <CardHeader>
          <CardTitle className="font-bold text-xl tracking-tight flex items-center gap-2 font-serif">
            🏆
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-[300px]">
              <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No scores yet. Be the first to play!
            </div>
          ) : (
            <ScrollArea className="h-[300px] pr-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2 font-medium">Rank</th>
                    <th className="text-left pb-2 font-medium">Player</th>
                    <th className="text-right pb-2 font-medium">Score</th>
                    <th className="text-right pb-2 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr
                      key={entry.id}
                      className={`border-b border-border/30 ${
                        index < 3 ? "font-medium" : ""
                      }`}
                    >
                      <td className="py-3 flex items-center">
                        {getMedal(index)}
                        <span className="ml-1">#{index + 1}</span>
                      </td>
                      <td className="py-3 font-serif">{entry.user.username}</td>
                      <td className="py-3 text-right font-serif">{entry.value}</td>
                      <td className="py-3 text-right text-muted-foreground text-sm font-serif">
                        {new Date(entry.date).toLocaleDateString()}
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

export default Leaderboard;
