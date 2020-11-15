export interface RankingResponse {
  player?: string;
  position?: number;
  points: number;
  matchHistory: MatchHistory;
}

export interface MatchHistory {
  victories?: number;
  defeats?: number;
}