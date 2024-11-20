import coins from "./../public/zgETrV.gif";

const TotalCoins = ({ money }) => {
    return (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full flex items-center shadow-lg cursor-pointer hover:scale-105">
            <img src={coins} alt="Coin" className="w-8 h-8 mr-2" />
            <span className="font-bold">{money} Coins</span>
        </div>
    );
};

export default TotalCoins;

