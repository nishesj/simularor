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

export interface WsCommand {
  command: "START_SIMULATION" | "STOP_SIMULATION";
  payload: SimulationResponse;
}

export interface WsResponse {
  state: "SIMULATING" | "DONE";
  payload: SimulationResponse;
}
