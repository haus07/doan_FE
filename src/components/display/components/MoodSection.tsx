import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Hoặc 'next/navigation' nếu dùng Next
import { useGetMoods } from "@/services/moodService";

const MoodSection = () => {
  const { data: moods, isLoading } = useGetMoods();
  const navigate = useNavigate(); // Dùng để chuyển trang khi click

  if (isLoading) return <div className="h-40 animate-pulse bg-gray-800 rounded-xl"></div>;

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Moods & Genres</h2>
      
      {/* Grid Layout: Mobile 2 cột, Tablet 3 cột, Desktop 4-5 cột */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
        {moods.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(`/playlist/${item.slug}`)} // Chuyển hướng
            className="group relative h-40 rounded-xl overflow-hidden cursor-pointer shadow-lg"
          >
            {/* 1. Background Image */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                 // Fallback nếu ảnh lỗi thì dùng màu gradient
                 e.currentTarget.style.display = 'none';
              }}
            />

            {/* 2. Fallback Gradient (Hiện ra nếu ảnh lỗi hoặc chưa load kịp) */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} -z-10`} />

            {/* 3. Dark Overlay (Để chữ dễ đọc) */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />

            {/* 4. Text Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <h3 className="text-lg font-bold text-white drop-shadow-md group-hover:underline decoration-green-500 underline-offset-4">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MoodSection;