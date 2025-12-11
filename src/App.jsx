import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./MainLayout";
import DisplayHome from "./components/display/DisplayHome";
import DisplayAlbum from "./components/display/DisplayAlbum";
import DisplayArtist from "./components/display/DisplayArtist";
import Search from "./components/features/Search";
import ShowLyrics from "./components/player/ShowLyrics";
import { AnimatePresence } from "framer-motion";
import DisplaySong from "./components//display/DisplaySong";
import ContextMenu from "./components/common/ContextMenu";
import ScrollToTop from "./components/ScrollToTop";
import Podcasts from "./pages/Podcasts"
import PodcastDetail from "./pages/PodcastDetail";
import { PlayerContext } from "./context/PlayerContext";
import { Toaster } from 'react-hot-toast';

const App = () => {
  const location = useLocation();
  const { audioRef, track } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black text-white">
      <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      <ContextMenu />
    
    <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        
          {/* Route cha dùng MainLayout */}
          <Route path="/" element={<MainLayout />}>
            
            {/* Các Route con này sẽ được chui vào <Outlet /> trong file Display.jsx */}
            <Route index element={<DisplayHome />} />
            <Route path="album/:id" element={<DisplayAlbum />} />
            <Route path="artist/:id" element={<DisplayArtist />} />
          <Route path="search" element={<Search />} />
          <Route path="/showlyrics/:id" element={<ShowLyrics />} />
          <Route path="/song/:id" element={<DisplaySong />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/podcasts/:id" element={<PodcastDetail />} />
            {/* Thêm các route khác tương tự... */}
          </Route>
          
      </Routes>
    </AnimatePresence>
       <audio ref={audioRef} src={track?.file_path} preload="auto"></audio>
    </div>
  );
};

export default App;




 