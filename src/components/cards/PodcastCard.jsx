import React from "react";

const PodcastCard = ({ podcast }) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform">
      <img
        src={podcast.image}
        alt={podcast.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg">{podcast.name}</h3>
        <p className="text-gray-400 text-sm mt-1">{podcast.desc}</p>
      </div>
    </div>
  );
};

export default PodcastCard;
