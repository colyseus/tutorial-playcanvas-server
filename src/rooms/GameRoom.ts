import { Room, Client } from "@colyseus/core";
import {Players, PlayerState} from "./schema/PlayerState";

export class GameRoom extends Room<Players> {

  maxClients = 2;

  onCreate (options: any) {
    this.setState(new Players());
    this.onMessage("updatePosition", (client, msg) => {
      console.log("update received -> ");
      console.debug(msg);
      for (let playerId in msg.players) {
        const playerData = this.state.players.get(playerId);
        const newPlayerData = msg.players[playerId];
        playerData.x = newPlayerData.x;
        playerData.y = newPlayerData.y;
        playerData.z = newPlayerData.z;
      }
      this.broadcast("updatePosition", this.state);
    });
  }

  onJoin(client: Client, options: any) {
    const newPlayer = new PlayerState();
    if(this.state.players.size == 1) {
      newPlayer.x = 1;
      newPlayer.y = 1;
      newPlayer.z = 0;
    } else {
      newPlayer.x = 0;
      newPlayer.y = 0;
      newPlayer.z = 0
    }
    this.state.players.set(client.sessionId, newPlayer);
    console.log(client.sessionId, "joined!");
    console.debug(this.state.players.toJSON());
    this.broadcast("joined", this.state);
  }

  onLeave (client: Client, consented: boolean) {
    this.state.players.delete(client.sessionId);
    console.log(client.sessionId, "left!");
    console.debug(this.state.players.toJSON());
    this.broadcast("playerLeft", this.state);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
