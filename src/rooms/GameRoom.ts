import { Room, Client } from "@colyseus/core";
import { PlayerState } from "./schema/PlayerState";

export class GameRoom extends Room<PlayerState> {

  maxClients = 2;

  onCreate (options: any) {
    this.setState(new PlayerState());

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
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
