import {Game} from "@/types/game";

export interface UserStats {
  id: number;
  losses: number;
  score: number;
  wins: number;
  game_quantity: number;
}

export interface StatsResponse {
  stats: UserStats;
  recentlyGames: Game[];
}