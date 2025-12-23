import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from "framer-motion";

// Contexts
import { PlayerContext } from "./context/PlayerContext";
import { PopupContext } from "./context/PopUpContext";

// Components & Pages
import MainLayout from "./MainLayout";
import DisplayHome from "./components/display/DisplayHome";
import DisplayAlbum from "./components/display/DisplayAlbum";
import DisplayArtist from "./components/display/DisplayArtist";
import DisplaySong from "./components/display/DisplaySong"; // Fixed path
import Search from "./components/features/Search";
import ShowLyrics from "./components/player/ShowLyrics";
import ContextMenu from "./components/common/ContextMenu";
import LoginModal from "./components/modal/LoginModal";
import Podcasts from "./pages/Podcasts";
import PodcastDetail from "./pages/PodcastDetail";

const App = () => {
  const location = useLocation();
  
  // 1. Lấy Context
  const playerContext = useContext(PlayerContext);
  const popupContext = useContext(PopupContext);

  // 2. Fail-safe: Nếu Context chưa load xong (null), không render gì cả để tránh crash
  if (!playerContext || !popupContext) {
    return null; 
  }

  const { audioRef, track } = playerContext;
  const { isLoginOpen, setIsLoginOpen } = popupContext;

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
      
      {/* Auth Modal */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => {
          setIsLoginOpen(false)
        }}
        onSwitchToRegister={() => {
           // setIsLoginOpen(false); setIsRegisterOpen(true);
        }}
      />
      
      <ContextMenu />
    
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        
          {/* Main Layout Wrapping */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DisplayHome />} />
            <Route path="album/:id" element={<DisplayAlbum />} />
            <Route path="artist/:id" element={<DisplayArtist />} />
            <Route path="search" element={<Search />} />
            <Route path="showlyrics/:id" element={<ShowLyrics />} />
            <Route path="song/:id" element={<DisplaySong />} />
            <Route path="podcasts" element={<Podcasts />} />
            <Route path="podcasts/:id" element={<PodcastDetail />} />
          </Route>
          
        </Routes>
      </AnimatePresence>

      {/* Audio Player Core */}
      {/* Lưu ý: 'track.file' phải khớp với interface Song trong PlayerContext */}
      <audio ref={audioRef} src={track?.file_path} preload="auto"></audio>
    </div>
  );
};

export default App;