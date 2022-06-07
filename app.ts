import express, { Express } from "express";
import routes from "./routes/simulations";

const app: Express = express();
/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());

/** Routes */
app.use("/api/v1", routes);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

export = app;
