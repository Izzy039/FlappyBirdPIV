
import Phaser, { Scenes } from "phaser";
import GameScene from "./scenes/game-scene";

const GLOBAL_CONFIG = {
  width: 800,
  height: 600,
}

const config = {
  type: Phaser.AUTO,
  ...GLOBAL_CONFIG,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {y: 450}
    }
  },
  scene: [new GameScene(GLOBAL_CONFIG)]
}

new Phaser.Game(config);
