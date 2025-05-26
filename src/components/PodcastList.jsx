import React from "react";
import { Link } from "react-router-dom"; // <== thêm dòng này
import { motion } from "framer-motion";
import podcast1Img from "../assets/hinh/podcast/podcast1.jpg";
import podcast2Img from "../assets/hinh/podcast/podcast2.jpg";
import podcast3Img from "../assets/hinh/podcast/podcast3.jpg";
import podcast1vd from "../assets/hinh/podcast/podcast.mp3";
import {podcasts} from "../assets/assets"



const PodcastList = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-[700px] mx-auto">
      {podcasts.map((podcast, index) => (
        <Link to={`/podcasts/${podcast.id}`} key={podcast.id}>
          <motion.div
            className="flex items-center bg-[#222222] rounded-lg p-6 cursor-pointer relative"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <div className="text-4xl font-bold text-green-500 select-none w-12 text-center">
              {index + 1}
            </div>
            <motion.div
              className="relative w-40 h-40 rounded-lg overflow-hidden flex-shrink-0 mx-6"
              variants={{ rest: { scale: 1 }, hover: { scale: 0.85 } }}
            >
              <img
                src={podcast.image}
                alt={podcast.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-lg border-4 border-dashed border-green-500"
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
                style={{
                  boxSizing: "border-box",
                  animation: "zigzagBorder 2s linear infinite",
                }}
              />
            </motion.div>
            <div className="flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-white">
                {podcast.name}
              </h3>
              <p className="text-green-400 mb-2">{podcast.author}</p>
              <p className="text-gray-300 text-sm line-clamp-3">
                {podcast.desc}
              </p>
            </div>
            <motion.div
              className="absolute bottom-2 left-0 right-0 mx-auto w-[90%] bg-[#121212cc] rounded px-2 py-1 text-green-400 font-mono text-sm whitespace-nowrap overflow-hidden"
              variants={{
                rest: {
                  opacity: 0,
                  height: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                },
                hover: {
                  opacity: 1,
                  height: "auto",
                  paddingTop: "0.25rem",
                  paddingBottom: "0.25rem",
                },
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="whitespace-nowrap"
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                🎧 Listening to {podcast.title}... Stay tuned for new episodes!
                🎤
              </motion.div>
            </motion.div>
            <style>
              {`
                @keyframes zigzagBorder {
                  0% {
                    border-image-source: linear-gradient(45deg, #22c55e 25%, transparent 25%, transparent 50%, #22c55e 50%, #22c55e 75%, transparent 75%, transparent);
                    border-image-slice: 1;
                    border-image-width: 4;
                    border-image-repeat: round;
                    background-position: 0 0;
                  }
                  100% {
                    background-position: 20px 0;
                  }
                }
              `}
            </style>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default PodcastList;
