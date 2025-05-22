import React from "react";
import { useEffect } from "react";
import logo from "../assets/hinh/intro/Full_Logo_Green_.png"
import { motion } from "framer-motion";


const Intro = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // chạy callback sau 3 giây
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-black via-green-500/5 blur-2xl animate-pulse"></div>

  <motion.img
    src={logo}
    className="w-60 md:w-80 lg:w-96 object-contain drop-shadow-[0_0_15px_rgba(30,215,96,0.6)]"
    initial={{ opacity: 0, scale: 0.8, y: 50 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
  />


</div>
  );
};



export default Intro