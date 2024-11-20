import { Boot } from "./scenes/Boot";
import { Preloader } from "./scenes/Preloader";
import { Game } from "./scenes/game/Game";
import { QuestionOverlay } from "./scenes/question/QuestionOverlay";
import Phaser from "phaser";
import { SIZES } from "./constants";

const config = {
  type: Phaser.AUTO,
  width: SIZES.screen.width,
  height: SIZES.screen.height,
  parent: "game-container",
  backgroundColor: "#028af8",
  scene: [Boot, Preloader, Game, QuestionOverlay],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

export default function StartGame(parent) {
  return new Phaser.Game({ ...config, parent });
}
