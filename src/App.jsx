import { useEffect, useState } from "react";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import GamePage from "./pages/game/GamePage";
import ShopPage from "./pages/shop/ShopPage";
import donkeyImage from "./pages/home/donkey_kong.jpg";
import kartKings from "./pages/home/kart_kings.png";
import voidHunter from "./pages/home/void_hunter.png";
import webWarrior from "./pages/home/web_warrior.png";
import { useAudio } from "./hooks/useAudio";

export const PAGES = {
  LOGIN: "login",
  HOME: "home",
  GAME: "game",
  SHOP: "shop",
};

function App() {
  const [page, setPage] = useState(PAGES.LOGIN);
  const [coins, setCoins] = useState(1000);
  const [boughtItems, setBoughtItems] = useState([]);
  const [games, setGames] = useState([
    {
      name: `Retro Kong`,
      img: donkeyImage,
      review: `A classic game that never gets old`,
      owned: false,
    },
    {
      name: `Kart Kings`,
      img: kartKings,
      review: `Race your way to the top`,
      owned: false,
    },
    {
      name: `Void Hunter`,
      img: voidHunter,
      review: `Hunt the void and save the world`,
      owned: false,
    },
    {
      name: `Web Warrior`,
      img: webWarrior,
      review: `Defend the web against the bugs`,
      owned: false,
    },
  ]);
  const appMusic = useAudio("assets/donkeyKong/app_soundtrack.mp3");

  useEffect(() => {
    if (!appMusic.playing) {
      if (page !== PAGES.GAME) {
        appMusic.toggle();
      }
    } else {
      if (page === PAGES.GAME) {
        appMusic.toggle();
      }
    }
  }, [page, appMusic]);

  let component = null;
  if (page === PAGES.LOGIN) {
    component = <LoginPage setPage={setPage} />;
  } else if (page === PAGES.HOME) {
    component = <HomePage setPage={setPage} games={games} setGames={setGames} boughtItems={boughtItems} />;
  } else if (page === PAGES.GAME) {
    component = <GamePage setPage={setPage} coins={coins} setCoins={setCoins} />;
  } else if (page === PAGES.SHOP) {
    component = (
      <ShopPage
        setPage={setPage}
        coins={coins}
        setCoins={setCoins}
        boughtItems={boughtItems}
        setBoughtItems={setBoughtItems}
      />
    );
  }

  return <div id="app">{component}</div>;
}

export default App;
