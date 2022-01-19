import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";

import { MyRoom } from "./rooms/MyRoom";

export default Arena({
    getId: () => "PlayCanvas Colyseus Demo App",

    initializeGameServer: (gameServer) => {
        gameServer.define('my_room', MyRoom);
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
