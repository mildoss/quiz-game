export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  id: number;
  username: string;
}

export interface UserStats {
  id: number;
  losses: number;
  score: number;
  wins: number;
  game_quantity: number;
}