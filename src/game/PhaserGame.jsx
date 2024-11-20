import { forwardRef, useLayoutEffect, useRef } from "react";
import StartGame from "./main";

export const PhaserGame = forwardRef(function PhaserGame(
    { setPage, coins, setCoins },
    ref
) {
    const game = useRef();

    const onEndGame = (isWin, coins) => {
        if (isWin === true) {
            setCoins((prevCoins) => prevCoins + (coins || 200));
            alert(`You won ${coins || 200} coins!`);
        } else if (isWin === false) {
            alert("Game over!");
        }

        if (setPage) {
            if (game.current) {
                game.current.destroy(true);
                game.current = null;
            }
            setPage("home");
        }
    };

    useLayoutEffect(() => {
        if (!game.current) {
            game.current = StartGame("game-container");

            setTimeout(() => {
                const gameScene = game.current.scene.getScene("Game");
                if (gameScene) {
                    gameScene.scene.start("Game", { onEndGame });
                }
            }, 200);

            if (ref) {
                ref.current = { game: game.current, scene: null };
            }
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = null;
            }
        };
    }, [ref]);

    return <div id="game-container"></div>;
});

