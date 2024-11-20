const SkinCard = ({ title, price, img, handleBuy, isBought }) => {
    return (
        <div
            className={`rounded-xl p-4 shadow-lg transform transition hover:shadow-2xl ${
                isBought
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:scale-105"
            }`}
        >
            <img
                src={img}
                alt={title}
                className="mx-auto max-w-full h-48 rounded-lg object-cover mb-4"
            />
            <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-2">
                {title}
            </h3>
            <p className="text-yellow-300 text-sm mb-4 "
            style={{fontFamily: "'Press Start 2P', cursive",}}>{price}</p>
            <button
                onClick={handleBuy}
                disabled={isBought}
                className={`px-8 py-2 rounded-md font-bold transition-all transform ${
                    isBought
                        ? "bg-gray-500 cursor-not-allowed opacity-40"
                        : "bg-purple-700 text-white hover:bg-purple-900 hover:scale-105 hover:shadow-[0_0_20px_#7c3aed] hover:cursor-pointer"
                }`}
            >
                Buy
            </button>
        </div>
    );
};

export default SkinCard;

