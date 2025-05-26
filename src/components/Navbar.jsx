import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./PremiumButton.css";

const Navbar = () => {
  const navigate = useNavigate();

  // Để highlight đúng tab đang active, bạn có thể lấy pathname hiện tại
  const currentPath = window.location.pathname.toLowerCase();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-3">
          <img
            onClick={() => navigate(-1)}
            className="w-8 h-8 bg-black p-2 rounded-full cursor-pointer hover:scale-105 transition-transform"
            src={assets.arrow_left}
            alt="Back"
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 h-8 bg-black p-2 rounded-full cursor-pointer hover:scale-105 transition-transform"
            src={assets.arrow_right}
            alt="Forward"
          />
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{
              scale: 1.06,
              boxShadow: "0 8px 20px rgba(255, 255, 255, 0.25)",
            }}
            className="relative hidden md:block group rounded-full overflow-hidden cursor-pointer"
          >
            <div className="shiny-border absolute inset-0 z-0 rounded-full pointer-events-none" />
            <p className="relative z-10 bg-white text-black text-sm px-4 py-1 rounded-full">
              Explore Premium
            </p>
          </motion.div>

          <p className="bg-black py-1 px-3 rounded-full text-sm cursor-pointer hover:bg-gray-800 transition-all">
            Install App
          </p>

          <div className="bg-purple-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer">
            ?
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4 text-sm">
        {["All", "Music", "Podcasts"].map((item, index) => {
          // Xác định class active dựa vào currentPath
          const lowerItem = item.toLowerCase();
          const isActive =
            (lowerItem === "all" &&
              (currentPath === "/" || currentPath === "/all")) ||
            (lowerItem === "podcasts" && currentPath.startsWith("/podcasts"));

          return (
            <p
              key={index}
              onClick={() => {
                if (lowerItem === "podcasts") {
                  navigate("/podcasts"); // chuyển trang Podcasts
                } else if (lowerItem === "all") {
                  navigate("/all"); // hoặc navigate("/")
                }
                // Music không làm gì => giữ nguyên trang
              }}
              className={`px-4 py-1 rounded-full cursor-pointer transition-all ${
                isActive
                  ? "bg-white text-black"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {item}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
