import React from "react";
import { Routes, Route } from "react-router-dom";
import PodcastList from "../components/PodcastList";
import PodcastDetail from "./PodcastDetail";

const Podcasts = () => {
  return (
    <div className="flex-1 overflow-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Podcasts</h1>
      <Routes>
        {/* Trang danh sách podcast */}
        <Route index element={<PodcastList />} />
        {/* Trang chi tiết podcast theo id */}
        <Route path=":id" element={<PodcastDetail />} />
      </Routes>
    </div>
  );
};

export default Podcasts;
