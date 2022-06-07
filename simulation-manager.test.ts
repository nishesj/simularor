import { SimulationResponse, WsResponse } from "./models";
import SimulationManager from "./simulation-manager";
jest.useFakeTimers();
jest.spyOn(global, "setInterval");

describe("Simulator", () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  test("should run the simulation for 90 sec", async () => {
    const payload: SimulationResponse = {
      id: "1",
      matches: [
        {
          team1: "Germany",
          team2: "Poland",
        },
      ],
      scores: {
        Germany: 0,
        Argentina: 0,
      },
      totalScore: 0,
    };
    const manager = new SimulationManager();
    const callback = jest.fn();
    manager.startSimulation(payload, callback);
    jest.advanceTimersByTime(90 * 1000);
    expect(callback).toHaveBeenCalledTimes(9);
  });

  test("should score every 10 sec", async () => {
    const payload: SimulationResponse = {
      id: "1",
      matches: [
        {
          team1: "Germany",
          team2: "Poland",
        },
      ],
      scores: {
        Germany: 0,
        Poland: 0,
      },
      totalScore: 0,
    };
    const manager = new SimulationManager();

    // deep copy of the result
    const callback = jest.fn((x: WsResponse) => JSON.parse(JSON.stringify(x)));

    manager.startSimulation(payload, callback);
    jest.advanceTimersByTime(10 * 1000);

    expect(callback.mock.results[0].value.payload.totalScore).toBe(1);
    jest.advanceTimersByTime(41 * 1000);
    expect(callback.mock.results[3].value.payload.totalScore).toBe(4);

    jest.advanceTimersByTime(91 * 1000);
    expect(callback.mock.results[8].value.payload.totalScore).toBe(9);
    expect(callback.mock.results[8].value.state).toBe("DONE");
  });
});
