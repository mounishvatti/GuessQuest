import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { getLeaderboard } from "../services/gameService";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  value: number;
  user: {
    username: string;
  }
}

export default function Features() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
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

  const getMedal = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy size={32} className="text-gold animate-pulse-scale" />;
      case 2:
        return <Medal size={32} className="text-silver" />;
      case 3:
        return <Award size={32} className="text-bronze" />;
      default:
        return null;
    }
  };

  const renderLeaderboard = () => {
    const entries =
      leaderboard.length < 10
        ? Array.from(
            { length: 10 },
            (_, i) => leaderboard[i % leaderboard.length]
          )
        : leaderboard;

    return entries.map((entry, index) => (
      <div className="flex items-center" key={`${entry.id}-${index}`}>
        <span className="mx-8 text-xl font-heading sm:text-2xl lg:text-4xl flex justify-center">
          {getMedal((index % leaderboard.length) + 1)}#
          {(index % leaderboard.length) + 1} {entry.user.username}:{" "}
          {entry.value}
        </span>
      </div>
    ));
  };

  return (
    <div className="w-full">
      <div>
        <Marquee
          className="border-y-border dark:border-y-darkBorder dark:border-darkBorder dark:bg-secondaryBlack border-y-2 bg-white py-3 font-base sm:py-5"
          direction="left"
        >
          <div className="flex items-center">
            <span className="mx-8 text-xl font-heading sm:text-2xl lg:text-4xl">
              🏆 Leaderboard -
            </span>
          </div>
          {loading ? (
            <div className="flex items-center">
              <span className="mx-8 text-xl font-heading sm:text-2xl lg:text-4xl">
                Loading...
              </span>
            </div>
          ) : (
            renderLeaderboard()
          )}
        </Marquee>
      </div>
    </div>
  );
}
