import { useState } from "react";
import SkinCard from "./components/SkinCard";
import TotalCoins from "./components/TotalCoins";

import sprite1 from "./public/sprite1.png";
import sprite2 from "./public/sprite2.png";
import sprite3 from "./public/sprite3.png";
import coins1 from "./public/coins1.png";
import coins2 from "./public/coins2.png";
import coins3 from "./public/coins3.png";
import coins4 from "./public/coins4.png";
import coins5 from "./public/coins5.png";
import coins6 from "./public/coins6.png";
import key from "./public/key.png";
import key3 from "./public/key3.png";
import key5 from "./public/key5.png";
import { PAGES } from "../../App";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

const skinsAndGames = [
  { id: 1, title: "Finn", price: "100 coins", img: sprite1 },
  { id: 2, title: "Boltz", price: "200 coins", img: sprite2 },
  { id: 3, title: "Reddy", price: "500 coins", img: sprite3 },
  { id: 4, title: "Game Key", price: "1000 coins", img: key },
  { id: 5, title: "5 Game Keys", price: "4500 coins", img: key3 },
  { id: 6, title: "10 Game Keys", price: "8000 coins", img: key5 },
];

const coinsOptions = [
  { id: 1, title: "100 coins", price: "1.99 USD", img: coins1 },
  { id: 2, title: "500 coins", price: "4.99 USD", img: coins2 },
  { id: 3, title: "1000 coins", price: "9.99 USD", img: coins3 },
  { id: 4, title: "5000 coins", price: "49.99 USD", img: coins4 },
  { id: 5, title: "10000 coins", price: "99.99 USD", img: coins5 },
  { id: 6, title: "Unlock everything", price: "199.99 USD", img: coins6 },
];

export default function ShopPage({ setPage, coins, setCoins, boughtItems, setBoughtItems }) {
  const [open, setOpen] = useState(false);

  const handleBuy = (id) => {
    const item = skinsAndGames.find((skin) => skin.id === id);
    const price = parseInt(item.price.split(" ")[0]);

    if (boughtItems.includes(item)) {
      alert("You already have this item!");
      return;
    }

    if (coins >= price) {
      setCoins(coins - price);
      setBoughtItems([...boughtItems, item]);
    } else {
      alert("Not enough coins!");
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url('./arcade.jpg')` }}>
        <div className="absolute top-4 left-4">
          <button
            onClick={() => setPage(PAGES.HOME)}
            className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-900 transition-all"
          >
            <ArrowBackIcon />
          </button>
        </div>
        <div onClick={() => setOpen(true)}>
          <TotalCoins money={coins} />
        </div>
        <div className="max-w-6xl mx-auto py-16 px-8 text-center">
          <h1 className="font-retro text-purple-500 text-4xl glow">Shop</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {skinsAndGames.map((skin) => (
              <SkinCard
                key={skin.id}
                id={skin.id}
                title={skin.title}
                price={skin.price}
                img={skin.img}
                isBought={boughtItems.includes(skin)}
                handleBuy={() => handleBuy(skin.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="flex items-center justify-center bg-black bg-opacity-50"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="p-6 bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full">
          <div id="modal-modal-title" className="text-3xl font-bold text-purple-500 text-center mb-6 font-retro">
            Buy Coins
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coinsOptions.map((option) => (
              <div
                key={option.id}
                className="bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 p-4 flex flex-col items-center"
              >
                <div className="w-32 h-32 flex items-center justify-center">
                  <img src={option.img} alt={option.title} className="w-32 h-3w-32 mb-4 object-fill" />
                </div>

                <p className="text-lg font-semibold text-gray-300 mb-2">{option.title}</p>

                <p className="text-purple-400 font-medium text-base mb-4">{option.price}</p>

                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition">
                  Buy
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setOpen(false)}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Close
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
