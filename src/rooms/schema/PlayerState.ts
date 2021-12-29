import { MapSchema, Schema, type } from "@colyseus/schema";

export class PlayerState extends Schema {

  @type("number") x: number;
  @type("number") y: number;
  @type("number") z: number;
}

export class Players extends Schema {
  @type({map: PlayerState}) players = new MapSchema<PlayerState>();
}
