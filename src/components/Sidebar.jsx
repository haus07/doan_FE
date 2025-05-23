import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import "./PremiumButton.css";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const navItemVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <motion.div
      className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top menu section */}
      <motion.div
        className="bg-gradient-to-br from-black to-[#0f0f0f] h-[15%] rounded-xl flex flex-col justify-around relative overflow-hidden backdrop-blur-sm border border-green-800/30"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-green-500/5" />

        {/* Home */}
        <motion.div
          variants={navItemVariants}
          initial="rest"
          whileHover="hover"
          className="relative z-10"
        >
          <Link to="/" className="flex items-center gap-3 pl-8 cursor-pointer py-2 rounded-lg mx-2 transition-all duration-300 hover:bg-green-500/10 hover:backdrop-blur-md">
            <motion.img
              className="w-6"
              src={assets.home_icon}
              alt=""
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <p className="font-bold bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">Home</p>
          </Link>
        </motion.div>

        {/* Search */}
        <motion.div
          variants={navItemVariants}
          initial="rest"
          whileHover="hover"
          className="relative z-10"
        >
          <Link to="/search" className="flex items-center gap-3 pl-8 cursor-pointer py-2 rounded-lg mx-2 transition-all duration-300 hover:bg-green-500/10 hover:backdrop-blur-md">
            <motion.img
              className="w-6"
              src={assets.search_icon}
              alt=""
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <p className="font-bold bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">Search</p>
          </Link>
        </motion.div>
      </motion.div>

      {/* Library section */}
      <motion.div
        className="bg-gradient-to-br from-black to-[#0f0f0f] h-[85%] rounded-xl relative overflow-hidden backdrop-blur-sm border border-green-800/30"
        variants={itemVariants}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-800/10 via-green-500/5 to-green-700/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(34,197,94,0.1), rgba(22,163,74,0.05), rgba(5,150,105,0.1))",
              "linear-gradient(45deg, rgba(5,150,105,0.1), rgba(34,197,94,0.1), rgba(22,163,74,0.05))",
              "linear-gradient(45deg, rgba(22,163,74,0.05), rgba(5,150,105,0.1), rgba(34,197,94,0.1))"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Header */}
        <motion.div className="p-4 flex items-center justify-between relative z-10" variants={itemVariants}>
          <div className="flex items-center gap-3">
            <motion.img
              className="w-8"
              src={assets.stack_icon}
              alt=""
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <p className="font-semibold bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">Your library</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.img
              className="w-5 cursor-pointer"
              src={assets.arrow_icon}
              alt=""
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.img
              className="w-5 cursor-pointer"
              src={assets.plus_icon}
              alt=""
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </motion.div>

        {/* Playlist cards */}
        {[
          {
            title: "Create your first playlist",
            subtitle: "It's easy we will help you",
            button: "Create Playlist",
            gradient: "from-green-400 to-emerald-400"
          },
          {
            title: "Let's find some podcasts to follow",
            subtitle: "We'll keep you updated on new episodes",
            button: "Browse podcasts",
            gradient: "from-lime-400 to-green-400"
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            className="p-4 bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] m-2 rounded-2xl font-semibold flex flex-col items-start justify-start gap-2 pl-4 relative overflow-hidden backdrop-blur-sm border border-green-700/50 shadow-2xl"
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />

            <h1 className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent relative z-10">
              {item.title}
            </h1>
            <p className="font-light text-gray-400 relative z-10">{item.subtitle}</p>

            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 30px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-full overflow-hidden cursor-pointer mt-4 inline-block group"
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="shiny-border" />
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                initial={false}
              />
              <button className="relative px-6 py-2 bg-gradient-to-r from-white to-gray-100 text-[15px] text-black rounded-full z-10 font-semibold transition-all duration-300 hover:from-gray-100 hover:to-white">
                {item.button}
              </button>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
