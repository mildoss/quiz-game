import Link from "next/link";
import { GameInfoResponse } from "@/types/game";

interface GameResultCardProps {
  user: GameInfoResponse;
  rank: number;
}

export const GameResultCard = ({ user, rank }: GameResultCardProps) => {
  const isFirst = rank === 1;

  return (
      <div className="w-full lg:w-8/12 m-auto">
        <Link
            href={`/stats/${user.user_id}`}
            className={`flex justify-between items-center p-6 rounded-2xl border transition-all duration-300 shadow-lg
          ${isFirst
                ? "bg-yellow-500/25 border-yellow-400/60 scale-105 z-10 shadow-[0_0_25px_rgba(234,179,8,0.2)]"
                : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800"
            }`}
        >
          <div className="flex items-center gap-4">
          <span className={`text-2xl font-black ${isFirst ? "text-amber-400" : "text-slate-500"}`}>
            #{rank}
          </span>
            <h2 className={`text-xl font-bold ${isFirst ? "text-white" : "text-slate-200"}`}>
              {user.username} {isFirst && "👑"}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 text-amber-400">
                <span className="text-xl">⭐</span>
                <span className="text-2xl font-black">{user.score}</span>
              </div>
            </div>

            <div className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider border
            ${user.status
                ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/50"
                : "bg-rose-600/20 text-rose-400 border-rose-500/50"
            }`}
            >
              {user.status ? 'Winner' : 'Player'}
            </div>
          </div>
        </Link>
      </div>
  );
};