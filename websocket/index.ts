import WebSocket from "ws";
import http from "http";
import { WsCommand, WsResponse } from "../models";
import Simulator from "../simulation-manager";

const simulator = new Simulator();

const websocketServer = (expressServer: http.Server) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/ws/v1/simulate",
  });

  expressServer.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket: any) => {
      websocketServer.emit("connection", websocket, request);
    });
  });

  websocketServer.on("connection", (websocketConnection, _) => {
    websocketConnection.on("message", (body) => {
      const message: WsCommand = JSON.parse(body.toString());
      if (message.command === "START_SIMULATION") {
        simulator.startSimulation(message.payload, (response: WsResponse) => {
          websocketConnection.send(JSON.stringify(response));
        });
      }
      if (message.command === "STOP_SIMULATION") {
        simulator.stopSimulation(message.payload, (response: WsResponse) => {
          websocketConnection.send(JSON.stringify(response));
          websocketConnection.close();
        });
      }
    });
  });

  return websocketServer;
};

export = websocketServer;
