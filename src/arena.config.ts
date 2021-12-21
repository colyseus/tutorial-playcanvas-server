import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";

import { GameRoom } from "./rooms/GameRoom";

export default Arena({
    getId: () => "PlayCanvas Colyseus Demo App",

    initializeGameServer: (gameServer) => {
        gameServer.define('playcanvas_room', GameRoom);

    },

    initializeExpress: (app) => {
        app.get("/", (req, res) => {
            res.send("Server ready!");
        });

        app.use("/colyseus", monitor());
    },

    beforeListen: () => {
    }
});
