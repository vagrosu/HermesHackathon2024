import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import PFP1 from "./PFP1.png";
import badge1 from "./badge1.png";
import badge2 from "./badge2.png";
import badge3 from "./badge3.png";

const RetroProfileBox = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const certificates = [
    {
      id: 1,
      name: "Cyber Security Basics",
      badge: badge1,
    },
    {
      id: 2,
      name: "Pentesting 101",
      badge: badge2,
    },
    {
      id: 3,
      name: "Retro Kong Champion",
      badge: badge3,
    },
  ];

  const handleOpenProfile = () => setProfileOpen(true);
  const handleCloseProfile = () => setProfileOpen(false);

  return (
    <div>
      <div
        onClick={handleOpenProfile}
        className="absolute top-4 right-4 flex items-center justify-center w-20 h-20 rounded-lg border-4 border-white shadow-md bg-gradient-to-br from-pink-500 to-purple-700 overflow-hidden cursor-pointer"
      >
        <img src={PFP1} alt="Profile" className="object-scale-down" />
      </div>

      <Modal
        open={profileOpen}
        onClose={handleCloseProfile}
        className="flex items-center justify-center bg-black bg-opacity-90"
        aria-labelledby="profile-modal-title"
        aria-describedby="profile-modal-description"
      >
        <Box
          className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 border-[4px] border-pink-500 rounded-lg shadow-xl max-w-3xl w-full text-pink-300"
          style={{
            boxShadow: "0 0 20px #ff007a, 0 0 40px #ff007a",
            fontFamily: "'Press Start 2P', cursive",
          }}
        >
          <Typography
            id="profile-modal-title"
            variant="h6"
            component="h2"
            className="text-xl text-center mb-6 tracking-wider"
            style={{ textShadow: "2px 2px 4px #000000", fontFamily: "'Press Start 2P', cursive" }}
          >
            YOUR CERTIFICATES
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col items-center justify-between p-6 bg-gradient-to-br from-gray-700 to-gray-800 border border-pink-500 rounded-lg shadow-md text-center"
                style={{
                  boxShadow: "0 0 10px #ff007a",
                  width: "220px",
                }}
              >
                <Typography
                  className="font-bold text-lg text-pink-200 mb-4"
                  style={{ textShadow: "1px 1px 2px #000000", fontFamily: "'Press Start 2P', cursive" }}
                >
                  {cert.name}
                </Typography>

                <div className="w-[180px] h-[180px] flex items-center justify-center bg-gray-900 rounded-lg border-4 border-pink-500 overflow-hidden">
                  <img src={cert.badge} alt={`${cert.name} Badge`} className="object-contain w-full h-full" />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleCloseProfile}
            className="bg-gray-700 text-pink-300 px-4 py-2 rounded-lg hover:bg-gray-600 hover:text-pink-100 w-full mt-8"
            style={{
              fontFamily: "'Press Start 2P', cursive",
            }}
          >
            Close
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default RetroProfileBox;
