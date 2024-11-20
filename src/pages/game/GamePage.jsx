import { PhaserGame } from "../../game/PhaserGame";
import { useRef } from "react";

export default function GamePage({ setPage, coins, setCoins }) {
    const phaserRef = useRef();

    return (
        <div className="border-8 border-purple-600 rounded-lg shadow-2xl">
            <PhaserGame
                ref={phaserRef}
                setPage={setPage}
                coins={coins}
                setCoins={setCoins}
            />
        </div>
    );
}

