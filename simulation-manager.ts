import { Matches, SimulationResponse, WsResponse } from "./models";

export default class SimulationManager {
  simulations: Map<string, number> = new Map();

  intervalId: number | undefined = undefined;

  startSimulation = (
    payload: SimulationResponse,
    progressCallback: (res: WsResponse) => void
  ): void => {
    let goalCounter = 0;
    // runs every 10 sec
    const intervalId = setInterval(() => {
      const allTeamsName = payload.matches.flatMap((m: Matches) => [
        m.team1,
        m.team2,
      ]);
      // score a random goal
      var team = allTeamsName[Math.floor(Math.random() * allTeamsName.length)];
      goalCounter += 1;
      payload.scores[team] = payload.scores[team] + 1;
      payload.totalScore = goalCounter;
      if (goalCounter == 9) {
        this.stopSimulation(payload, progressCallback);
      } else {
        const response: WsResponse = { state: "SIMULATING", payload: payload };
        progressCallback(response);
      }
    }, 10 * 1000);
    const timerId = intervalId[Symbol.toPrimitive]();
    this.simulations.set(payload.id, timerId);
  };

  stopSimulation = (
    payload: SimulationResponse,
    callback: (res: WsResponse) => void
  ) => {
    const timerId = this.simulations.get(payload.id);
    const response: WsResponse = { state: "DONE", payload: payload };

    if (timerId) {
      clearInterval(timerId);
      this.simulations.delete(payload.id);
      if (callback) {
        callback(response);
      }
    }
  };
}
