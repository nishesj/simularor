import http from "http";
import app from "./app";

/** Server */
const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
