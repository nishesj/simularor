export interface Matches {
  team1: string;
  team2: string;
}

export interface SimulationResponse {
  id: string;
  matches: Matches[];
  scores: { [key: string]: number };
  totalScore: number;
}
