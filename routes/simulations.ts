import express from "express";
import { SimulationResponse } from "../models";
import { randomUUID } from "crypto";
const router = express.Router();

router.get("/simulations/", (req, res) => {
  const MOCK_RESPONSE: SimulationResponse = {
    id: randomUUID(),
    matches: [
      {
        team1: "Germany",
        team2: "Poland",
      },
      {
        team1: "Brazil",
        team2: "Mexico",
      },
      {
        team1: "Argentina",
        team2: "Uruguay",
      },
    ],
    scores: {
      Germany: 0,
      Argentina: 0,
      Brazil: 0,
      Uruguay: 0,
      Mexico: 0,
      Poland: 0,
    },
    totalScore: 0,
  };
  return res.json(MOCK_RESPONSE);
});

export = router;
