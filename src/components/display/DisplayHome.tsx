import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "../layouts/Navbar";
import { useHandleGetPopularArtist } from "../../services/artists/artistService";

// Import Components
import Section from "../common/Section"; 
import HomeSkeleton from "../common/HomeSkeleton"; 
import MoodSection from "./components/MoodSection"; // <--- IMPORT CÁI MỚI

import { useGetRandomFiveAlbums } from "@/services/albumService";
import { useGetRandomTenSongs } from "@/services/songService";

const DisplayHome = () => {
  const { data: artists, isLoading: isLoadingArtist, isError: isErrorArtist } = useHandleGetPopularArtist();
  const { data: albumsData, isLoading: isLoadingAlbum, isError: isErrorAlbum } = useGetRandomFiveAlbums();
  const { data: songsData, isLoading: isLoadingSong, isError: isErrorSong } = useGetRandomTenSongs();

  // Xử lý Loading & Error
  if (isLoadingArtist && isLoadingAlbum) return <HomeSkeleton />;
  if (isErrorArtist) return <div className="text-center text-red-500 mt-10">Something went wrong!</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 text-white pb-24"
    >
      <div className="mt-6 space-y-8"> {/* Tăng khoảng cách giữa các section */}
        
        {/* SECTION 1: ARTISTS */}
        <Section title="Popular Artists" data={artists} type="artist" />

        {/* SECTION 2: CHARTS */}
        <Section title="Featured Charts" data={albumsData} type="album" />

        {/* SECTION 3: MOODS (THAY THẾ MADE FOR YOU) */}
        {/* Đây là component mới thay cho đoạn code cũ */}
        <MoodSection />

        {/* SECTION 4: HITS */}
        <Section title="Today's Biggest Hits" data={songsData} type="song" />

      </div>
    </motion.div>
  );
};

export default DisplayHome;