import { Room, Client } from "@colyseus/core";
import {Players, PlayerState} from "./schema/PlayerState";

export class GameRoom extends Room<Players> {

  maxClients = 2;

  onCreate (options: any) {
    this.state = new Players();
    this.onMessage("updatePosition", (client, msg: PlayerState) => {
      console.log("update received -> ");
      this.broadcast("updatePosition", msg);
    });

    this.onMessage("joined", (client, msg: PlayerState) => {
      console.log("joined received -> ");
      console.log(msg);
      this.broadcast("joined", msg);
    })
  }

  onJoin(client: Client, options: any) {
    console.log(this.state);
    const newPlayer = new PlayerState();
    newPlayer.x = 0;
    newPlayer.y = 0;
    newPlayer.z = 0;
    this.state.players.set(client.sessionId, newPlayer);
    console.log(this.state.players.get(client.sessionId));
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    this.state.players.delete(client.sessionId);
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
