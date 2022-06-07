import express from "express";
const router = express.Router();

router.get("/simulations/", (req, res) => {
  return res.json();
});

export = router;
