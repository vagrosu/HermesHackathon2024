import { useState } from "react";
import { PAGES } from "../../App";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LockIcon from "@mui/icons-material/Lock";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

import ProfileBox from "./Profile";

export default function HomePage({ setPage, games, setGames, boughtItems }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full h-screen flex flex-col items-center text-gray-200">
            <ProfileBox></ProfileBox>

            {/* Shop Button */}
            <div className="absolute top-4 left-4">
                <button
                    onClick={() => setPage(PAGES.SHOP)}
                    className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-900 transition-all"
                >
                    <ShoppingCartIcon />
                </button>
            </div>

            {/* Swiper */}
            <div className="max-w-[70%] mx-auto my-auto">
                <Swiper
                    modules={[]}
                    navigation
                    spaceBetween={30}
                    slidesPerView={3}
                    centeredSlides={true}
                    className="relative"
                    loop={true}
                >
                    {games.map((d, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className={`${
                                    d.owned
                                        ? "bg-gray-200 hover:translate-y-[-5px] hover:shadow-lg"
                                        : "bg-gray-500 opacity-95"
                                } rounded-xl shadow-md transition transform overflow-hidden`}
                            >
                                {/* Card Header */}
                                <div
                                    className={`h-56 ${
                                        d.owned
                                            ? "bg-gradient-to-br from-indigo-500 to-indigo-700"
                                            : "bg-gradient-to-br from-indigo-500 to-indigo-700"
                                    } `}
                                >
                                    <img
                                        src={d.img}
                                        alt="Game Preview"
                                        className={`object-contain w-full h-full ${
                                            d.owned ? "" : "opacity-50"
                                        }`}
                                    />
                                </div>

                                {/* Card Body */}
                                <div className="p-6 text-center flex flex-col items-center gap-4">
                                    <div className="flex justify-center gap-2 items-center w-full">
                                        <p className="text-lg font-bold text-gray-800">
                                            {d.name}
                                        </p>
                                        <HelpOutlineIcon
                                            onClick={() => setOpen(true)}
                                            className="cursor-pointer text-gray-600 hover:text-gray-800 transition scale-[0.9]"
                                        />
                                    </div>
                                    <p className="text-gray-600">{d.review}</p>
                                    {d.owned ? (
                                        <button
                                            onClick={() => setPage(PAGES.GAME)}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 transition-all"
                                        >
                                            Start Game
                                        </button>
                                    ) : (
                                        <button
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 transition-all"
                                            onClick={() => {
                                                setGames(
                                                    games.map((game) =>
                                                        game.name === d.name
                                                            ? {
                                                                  ...game,
                                                                  owned: true,
                                                              }
                                                            : game
                                                    )
                                                );
                                            }}
                                        >
                                            Unlock
                                        </button>
                                    )}
                                    {!d.owned && (
                                        <LockIcon className="text-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] scale-[3.5]" />
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Modal */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                className="flex items-center justify-center bg-black bg-opacity-50"
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="p-6 bg-gray-800 rounded-lg shadow-xl max-w-lg w-full">
                    {/* Title */}
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        className="text-2xl font-bold text-white text-center mb-4"
                    >
                        Retro Kong
                    </Typography>

                    {/* Description */}
                    <Typography
                        id="modal-modal-description"
                        className="text-gray-300 text-sm leading-relaxed mb-4"
                    >
                        Retro Kong a căpătat conștiință și încearcă să-ți
                        hackuiască serverul! Scopul lui este să realizeze un
                        pentest și să obțină control total asupra sistemului
                        tău. Intră în joc, rezolvă provocările și oprește-l pe
                        Retro Kong pentru a câștiga un certificat de bază în
                        securitate cibernetică.
                    </Typography>

                    {/* Rules */}
                    <div className="text-gray-200  font-medium text-sm mt-8">
                        Reguli:
                    </div>
                    <ul className="list-disc list-inside text-gray-400 text-sm mb-4">
                        <li>Folosește tastele săgeți pentru a te deplasa.</li>
                        <li>Evită obstacolele pe parcurs.</li>
                        <li>Fiecare obstacol va reseta progresul tău.</li>
                        <li>Fiecare răspuns greșit te costă o viață.</li>
                    </ul>

                    {/* Challenge Text */}
                    <div className="text-gray-200 text-center font-medium text-sm mt-6">
                        Ești pregătit să faci față provocării?
                    </div>

                    {/* Difficulty */}
                    <div className="flex justify-center items-center mt-2">
                        <span className="text-gray-300 text-sm mr-2">
                            Dificultate:
                        </span>
                        <Rating
                            name="rating"
                            defaultValue={1}
                            precision={1}
                            readOnly
                            max={3}
                            className="text-yellow-400"
                            emptyIcon={
                                <StarIcon
                                    className="text-gray-400"
                                    fontSize="inherit"
                                />
                            }
                        />
                    </div>
                </Box>
            </Modal>
            
        </div>
    );
}

