import {Room, Client} from "@colyseus/core";
import {GameState, Player} from "./schema/GameState";

export class GameRoom extends Room<GameState> {

    maxClients = 2;

    onCreate(options: any) {
        this.setState(new GameState());

        this.onMessage("updatePosition", (client, data) => {
            console.log("update received -> ");
            console.debug(JSON.stringify(data));
            const player = this.state.players.get(data["id"]);
            player.x = data["x"];
            player.y = data['y'];
            player.z = data["z"];
            this.state.players.set(client.sessionId, player);
        });
    }

    onJoin(client: Client, options: any) {
        const newPlayer = new Player();
        if (this.state.players.size == 1) {
            newPlayer.x = 1;
            newPlayer.y = 1.031;
            newPlayer.z = 0;
        } else {
            newPlayer.x = 0;
            newPlayer.y = 1.031;
            newPlayer.z = 0
        }
        this.state.players.set(client.sessionId, newPlayer);
        console.log(client.sessionId, "joined!");
    }

    onLeave(client: Client, consented: boolean) {
        this.state.players.delete(client.sessionId);
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
