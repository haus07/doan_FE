import React, { useState, useRef, useEffect } from "react";
import { assets } from "../../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, Bell, Users, ArrowDownCircle, X } from "lucide-react";

// --- MOCK DATA FOR RECENT SEARCHES ---
const MOCK_RECENT_SEARCHES = [
  {
    id: 1,
    title: "Cho Bảo",
    subtitle: "Album • B Ray",
    image: "https://i.scdn.co/image/ab67616d0000b273a046c864455207755536412e", // Replace with a real URL or asset if needed
    type: "album"
  },
  {
    id: 2,
    title: "Cho Ba",
    subtitle: "Album • B Ray",
    image: "https://i.scdn.co/image/ab67616d0000b273575d71c6404987515714f36c",
    type: "album"
  },
  {
    id: 3,
    title: "Sparks",
    subtitle: "Song • Coldplay",
    image: "https://i.scdn.co/image/ab67616d0000b273de025b6c2242b6514781604a",
    type: "song"
  },
  {
    id: 4,
    title: "Trust Issues",
    subtitle: "Song • Drake",
    image: "https://i.scdn.co/image/ab67616d0000b2730c471c36970b940e0cf816e3",
    type: "song",
    explicit: true
  },
  {
    id: 5,
    title: "Thay Tôi Yêu Cô Ấy",
    subtitle: "Song • Thanh Hưng",
    image: "https://i.scdn.co/image/ab67616d0000b273760975608d4474775d742610",
    type: "song"
  }
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();
  
  // --- STATE ---
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef(null);

  // --- MOCK USER ---
  const isLoggedIn = true; 
  const user = {
    avatarInitial: "T",
    color: "bg-purple-500"
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full p-2 flex flex-col gap-4 relative z-50">
      
      {/* --- TOP ROW: Main Navigation & Search --- */}
      <div className="w-full flex justify-between items-center text-white h-12">
        
        {/* LEFT: History Navigation */}
        <div className="flex items-center gap-2 min-w-[80px]">
          <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition text-white hover:text-white bg-black/50 hover:bg-black/70"
          >
            <img className="w-4 h-4 invert opacity-70" src={assets.arrow_left} alt="Back" />
          </button>
          <button 
            onClick={() => navigate(1)}
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition text-white hover:text-white bg-black/50 hover:bg-black/70"
          >
            <img className="w-4 h-4 invert opacity-70" src={assets.arrow_right} alt="Forward" />
          </button>
        </div>

        {/* CENTER: Home & Search Bar (Spotify Style) */}
        <div className="flex items-center gap-2 flex-1 max-w-[500px] mx-4 relative z-50">
           {/* Home Button */}
           <div 
             onClick={() => navigate('/')}
             className="w-12 h-12 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-full flex items-center justify-center cursor-pointer transition-transform active:scale-95 flex-shrink-0"
           >
              <Home size={24} fill={currentPath === '/' ? "white" : "none"} className={currentPath === '/' ? "text-white" : "text-gray-400"} />
           </div>

           {/* Search Bar Container */}
           <div ref={searchContainerRef} className="flex-1 relative group">
              <div className="h-12 relative z-50">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Search size={20} className={`transition-colors ${isSearchFocused ? "text-white" : "text-gray-400 group-hover:text-white"}`} />
                  </div>
                  <input 
                     type="text" 
                     placeholder="What do you want to play?" 
                     onFocus={() => setIsSearchFocused(true)}
                     className={`block w-full h-full pl-10 pr-12 py-2 rounded-full text-gray-300 placeholder-gray-400 focus:outline-none transition-all font-medium truncate
                        ${isSearchFocused ? "bg-[#2A2A2A] border border-white/10 ring-0 text-white" : "bg-[#1F1F1F] hover:bg-[#2A2A2A] border-transparent"}
                     `}
                  />
                  {/* Right Icons inside Search (Ctrl K / Browser) */}
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
                      {isSearchFocused && (
                         <X 
                            size={18} 
                            className="text-gray-400 hover:text-white cursor-pointer" 
                            onClick={() => setIsSearchFocused(false)}
                         />
                      )}
                      {!isSearchFocused && (
                          <div className="hidden md:flex items-center border-l border-gray-600/50 pl-3 text-gray-400">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16" /></svg>
                          </div>
                      )}
                  </div>
              </div>

              {/* --- RECENT SEARCHES DROPDOWN --- */}
              <AnimatePresence>
                {isSearchFocused && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-0 left-0 right-0 pt-14 pb-2 bg-[#282828] rounded-2xl shadow-2xl border border-white/5 -z-10"
                    >
                        <div className="px-4 pt-2 pb-1">
                            <h3 className="text-sm font-bold text-white mb-2">Recent searches</h3>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                            {MOCK_RECENT_SEARCHES.map((item) => (
                                <div key={item.id} className="flex items-center justify-between px-2 py-2 mx-2 rounded-md hover:bg-[#3E3E3E] cursor-pointer group transition-colors">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="relative w-10 h-10 flex-shrink-0">
                                           <img 
                                              src={item.image} 
                                              alt={item.title} 
                                              className={`w-full h-full object-cover shadow-sm ${item.type === 'artist' ? 'rounded-full' : 'rounded-md'}`} 
                                           />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <p className={`text-sm font-medium text-white truncate ${item.id === 3 ? 'text-white' : ''}`}>{item.title}</p>
                                            <div className="flex items-center gap-1 text-xs text-gray-400 truncate">
                                                {item.explicit && (
                                                    <span className="bg-gray-400 text-black text-[9px] px-1 rounded-sm font-bold leading-tight" title="Explicit">E</span>
                                                )}
                                                <span>{item.subtitle}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={16} className="text-gray-400 hover:text-white" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>

        {/* RIGHT: User Actions & Profile */}
        <div className="flex items-center gap-2 min-w-[200px] justify-end">
          
          {!isLoggedIn ? (
             <>
                <button className="text-gray-400 font-bold hover:text-white px-4">Sign up</button>
                <button className="bg-white text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition">Log in</button>
             </>
          ) : (
             <>
               {/* Install App */}
               <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-all mr-2">
                  <ArrowDownCircle size={18} />
                  <span>Install App</span>
               </div>

               {/* Notifications */}
               <div className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer relative bg-black/50 rounded-full hover:bg-[#2A2A2A] transition">
                  <Bell size={18} />
                  <div className="absolute top-1 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#121212]"></div>
               </div>

               {/* Friends Activity */}
               <div className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer bg-black/50 rounded-full hover:bg-[#2A2A2A] transition">
                  <Users size={18} />
               </div>

               {/* Profile Avatar */}
               <div className="relative ml-2">
                 <div 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={`${user.color} w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm cursor-pointer hover:scale-105 ring-4 ring-black`}
                 >
                    {user.avatarInitial}
                 </div>
                 
                 {/* Dropdown Menu */}
                 <AnimatePresence>
                    {showDropdown && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-12 bg-[#282828] p-1 rounded-md shadow-2xl w-56 z-50 border border-white/5 origin-top-right"
                      >
                         <ul className="flex flex-col text-sm text-gray-200">
                            <li className="px-3 py-2.5 hover:bg-[#3E3E3E] rounded-sm cursor-pointer flex justify-between">Account <span className="text-xs">↗</span></li>
                            <li className="px-3 py-2.5 hover:bg-[#3E3E3E] rounded-sm cursor-pointer">Profile</li>
                            <li className="px-3 py-2.5 hover:bg-[#3E3E3E] rounded-sm cursor-pointer">Settings</li>
                            <div className="h-[1px] bg-gray-600 my-1 mx-2"></div>
                            <li onClick={() => setShowDropdown(false)} className="px-3 py-2.5 hover:bg-[#3E3E3E] rounded-sm cursor-pointer">Log out</li>
                         </ul>
                      </motion.div>
                    )}
                 </AnimatePresence>
               </div>
             </>
          )}
        </div>
      </div>

      {/* --- BOTTOM ROW: Category Pills (Fixed Position) --- */}
      {/* (Add your pills logic here if you want them back) */}
      
    </div>
  );
};

export default Navbar;