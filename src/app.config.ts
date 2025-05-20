import config from "@colyseus/tools";

import { LobbyRoom } from "colyseus";
import { playground } from "@colyseus/playground";
import { monitor } from "@colyseus/monitor";

import { MyRoom } from "./rooms/MyRoom";

export default config({
  initializeGameServer: (gameServer) => {
    // Expose MyRoom with realtime listing (lobby listing)
    gameServer
      .define('my_room', MyRoom)
      .enableRealtimeListing();

    // Expose LobbyRoom
    gameServer
      .define('lobby', LobbyRoom);
  },

  initializeExpress: (app) => {
    app.use("/", playground());
    app.use("/monitor", monitor());
  },

  beforeListen: () => {
  }
});
