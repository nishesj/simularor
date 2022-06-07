# How to run locally

1. Run `npm install`
   It will install npm packages for both server and client
2. Run `npm start`
   This will start both the client and server
3. Visit http://localhost:4200

# Solution Notes

- Simple TS express server with a simple REST API that returns the initial data for simulation like matches and scores.
- Client is built with Angular v14
- Client gets initial data for simluation through REST endpoint
- When simulation is stated a WebScoket(WS) connection is initialized for realtime progress of the simulation which is reflected in the UI

# Improvements

- Simulation in server side could be better handled with some Queue management library such as https://github.com/OptimalBits/bull based on redis.
- Optimization of server responses in WS.
- Integration / Unit tests of the UI
- Using State management system such as ngrx/akita etc
- Error handling and styling
