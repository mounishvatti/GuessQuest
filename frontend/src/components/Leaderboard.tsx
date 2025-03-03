import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeaderboard,
  fetchLeaderboardSuccess,
} from "../store/slices/leaderboardSlice";
import * as gameService from "../services/gameService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Medal, Award } from "lucide-react";

const Leaderboard: React.FC = () => {
  const dispatch = useDispatch();
  const { entries, loading } = useSelector((state) => state.leaderboard);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    // Load leaderboard when component mounts
    loadLeaderboard();

    // Set up refresh interval
    const interval = setInterval(() => {
      loadLeaderboard();
    }, 30000); // Refresh every 30 seconds

    setRefreshInterval(interval);

    // Clean up interval when component unmounts
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, []);

  const loadLeaderboard = async () => {
    dispatch(fetchLeaderboard());
    try {
      const data = await gameService.getLeaderboard();
      dispatch(fetchLeaderboardSuccess(data));
    } catch (error) {
      console.error("Failed to load leaderboard", error);
    }
  };

  // Format date for display
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  // Get medal for top 3 positions
  const getMedal = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy size={20} className="text-gold animate-pulse-scale" />;
      case 1:
        return <Medal size={20} className="text-silver" />;
      case 2:
        return <Award size={20} className="text-bronze" />;
      default:
        return null;
    }
  };

  return (
    <Card className="glass-panel w-full max-w-md mx-auto h-[400px] max-h-[70vh]">
      <CardHeader>
        <CardTitle className="font-light tracking-tight flex items-center gap-2">
          <Trophy size={20} className="text-primary" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : entries.length === 0 ? (
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
                {entries.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-border/30 ${
                      index < 3 ? "font-medium" : ""
                    }`}
                  >
                    <td className="py-3 flex items-center">
                      {getMedal(index)}
                      <span className="ml-1">{index + 1}</span>
                    </td>
                    <td className="py-3">{entry.username}</td>
                    <td className="py-3 text-right">{entry.score}</td>
                    <td className="py-3 text-right text-muted-foreground text-sm">
                      {formatDate(entry.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
