import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { albumsData } from "../assets/assets";
import Search from "./Search";
import ShowLyrics from "./ShowLyrics";
import { AnimatePresence } from "framer-motion";
import DisplayArtist from "./DisplayArtist";
import DisplaySong from "./DisplaySong";
import ScrollToTop from "./ScrollToTop";
import Podcasts from "../pages/Podcasts";
import PodcastDetail from "../pages/PodcastDetail";

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.slice(-1) : "";
  const bgColor = albumsData[Number(albumId)].bgColor;

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    } else {
      displayRef.current.style.background = "#121212";
    }
  }, [isAlbum, bgColor]);

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[55%] lg:ml-0 "
    >
      <ScrollToTop containerRef={displayRef} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<DisplayHome />} />
          <Route path="/album/:id" element={<DisplayAlbum />} />
          <Route path="/search" element={<Search />} />
          <Route path="/showlyrics/:id" element={<ShowLyrics />} />
          <Route path="/artist/:id" element={<DisplayArtist />} />
          <Route path="/song/:id" element={<DisplaySong />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/podcasts/:id" element={<PodcastDetail />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default Display;
