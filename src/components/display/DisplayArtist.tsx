import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Play, Pause, MoreHorizontal, Heart, CheckCircle, 
  ShoppingBag, ArrowRight
} from "lucide-react";
import { PlayerContext } from "../../context/PlayerContext";
import musicPlaying from "../../assets/hinh/musicplaying.gif";
import { useHandleGetArtistDetail } from "../../services/artists/artistService";

// ==================== 1. TYPES & INTERFACES ====================

// Type cho Song (Dựa theo API của bro)
interface Song {
  id: string;
  name: string;
  image: string;
  duration: string;
  artist?: string;
  album_id?: string;
}

// Type cho Artist Detail
interface ArtistDetail {
  id: string;
  name: string;
  image_detail_url: string;
  desc: string;
  songs: Song[];
}

// Type cho Mock Data (Để sau này dễ thay bằng API thật)
interface ExtraData {
  latestRelease: {
    name: string;
    type: string;
    year: string;
    image: string;
  };
  tourDates: Array<{
    id: number;
    day: string;
    month: string;
    city: string;
    venue: string;
    status: "Sold Out" | "Available";
  }>;
  merch: Array<{
    id: number;
    name: string;
    price: string;
    image: string;
  }>;
  appearsOn: Array<{
    name: string;
    image: string;
  }>;
}

// ==================== 2. MOCK DATA ====================
const MOCK_EXTRAS: ExtraData = {
  latestRelease: {
    name: "Justice (Complete Edition)",
    type: "New Album",
    year: "2024",
    image: "http://127.0.0.1:8000/storage/images/hinh/jb/ab67706c0000da848add4f50551b769f4fcb8c8d.jpg"
  },
  tourDates: [
    { id: 1, day: "12", month: "OCT", city: "Tokyo", venue: "Tokyo Dome", status: "Sold Out" },
    { id: 2, day: "15", month: "OCT", city: "Osaka", venue: "Kyocera Dome", status: "Available" },
    { id: 3, day: "20", month: "NOV", city: "Seoul", venue: "Gocheok Sky Dome", status: "Available" },
  ],
  merch: [
    { id: 1, name: "Justice World Tour Hoodie", price: "$65.00", image: "https://merchbar.imgix.net/product/109/6358/4739575808096/8966023_800.jpg?w=360&h=360&q=45&auto=format&fit=crop" },
    { id: 2, name: "Peaches Vinyl LP", price: "$35.00", image: "https://m.media-amazon.com/images/I/71X-xS-0u+L._UF1000,1000_QL80_.jpg" },
  ],
  appearsOn: [
    { name: "Stay (with Kid Laroi)", image: "https://i.scdn.co/image/ab67616d0000b27341e31d6ea1d493dd77933ee5" },
    { name: "I Don't Care (with Ed Sheeran)", image: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96" },
    { name: "Despacito (Remix)", image: "https://i.scdn.co/image/ab67616d0000b273919b910e92eb4635677d2424" },
  ]
};

// ==================== 3. SUB-COMPONENTS ====================

// --- Sub: Popular Songs ---
interface PopularSongsProps {
  songs: Song[];
  playWithId: (id: string) => void;
  currentSong: any; // Thay 'any' bằng Song type nếu context đã typed
  playStatus: boolean;
}

const PopularSongs = ({ songs, playWithId, currentSong, playStatus }: PopularSongsProps) => {
  const isCurrentSong = (songId: string) => currentSong && (currentSong.id === songId || currentSong._id === songId);
  
  return (
    <div className="bg-[#181818] p-5 rounded-xl h-full">
      <h2 className="text-xl font-bold mb-4">Popular</h2>
      <div className="flex flex-col gap-1">
        {songs.slice(0, 5).map((item, index) => {
           const isActive = isCurrentSong(item.id);
           return (
            <div key={item.id} 
              onClick={() => playWithId(item.id)}
              className={`group grid grid-cols-[20px_auto_1fr_auto] items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <div className="text-gray-400 text-sm flex justify-center w-5">
                {isActive && playStatus ? <img src={musicPlaying} className="w-3 invert opacity-70" alt="playing"/> : index + 1}
              </div>
              <img src={item.image} className="w-10 h-10 rounded shadow-sm object-cover" alt={item.name}/>
              <div className="truncate min-w-0">
                 <p className={`text-sm font-medium truncate ${isActive ? 'text-green-500' : 'text-white'}`}>{item.name}</p>
                 <p className="text-xs text-gray-400">{item.duration}</p>
              </div>
              <Heart size={16} className={`text-gray-400 hidden group-hover:block hover:text-green-500 ${isActive ? 'block text-green-500' : ''}`} />
            </div>
          )
        })}
      </div>
    </div>
  );
};

// --- Sub: Latest Release ---
const LatestRelease = () => (
  <div className="bg-[#181818] p-5 rounded-xl h-full flex flex-col hover:bg-[#202020] transition cursor-pointer group">
    <h2 className="text-xl font-bold mb-4">Latest Release</h2>
    <div className="flex gap-4 items-center">
      <div className="relative w-24 h-24 flex-shrink-0">
        <img src={MOCK_EXTRAS.latestRelease.image} className="w-full h-full object-cover rounded shadow-lg group-hover:scale-105 transition-transform" alt="Latest" />
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-[10px] font-bold bg-[#282828] text-gray-300 px-2 py-0.5 rounded w-fit uppercase tracking-wider">New Release</span>
        <h3 className="font-bold text-lg leading-tight mt-1 truncate">{MOCK_EXTRAS.latestRelease.name}</h3>
        <p className="text-sm text-gray-400">{MOCK_EXTRAS.latestRelease.year} • {MOCK_EXTRAS.latestRelease.type}</p>
      </div>
    </div>
    <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
      Listen now <div className="bg-green-500 rounded-full p-1 text-black"><Play size={10} fill="black"/></div>
    </div>
  </div>
);

// --- Sub: Discography ---
const Discography = ({ songs }: { songs: Song[] }) => (
  <div className="bg-[#181818] p-5 rounded-xl h-full">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Discography</h2>
      <span className="text-xs font-bold text-gray-400 hover:text-white cursor-pointer uppercase">Show all</span>
    </div>
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {songs.slice(0, 5).map((item, index) => (
        <div key={index} className="min-w-[140px] w-[140px] group cursor-pointer">
          <div className="relative mb-2 w-full aspect-square overflow-hidden rounded-md shadow-lg">
            <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={item.name} />
             <div className="absolute bottom-2 right-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all shadow-xl z-10">
               <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-black hover:scale-105">
                 <Play fill="black" size={18} className="ml-0.5" />
               </div>
            </div>
          </div>
          <p className="font-medium text-sm truncate text-white">{item.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">2023 • Single</p>
        </div>
      ))}
    </div>
  </div>
);

// --- Sub: About ---
const About = ({ artistDetail }: { artistDetail: ArtistDetail }) => (
  <div 
    className="bg-[#181818] rounded-xl h-full overflow-hidden relative group cursor-pointer min-h-[250px]"
    style={{ backgroundImage: `url(${artistDetail.image_detail_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity group-hover:via-black/60" />
    <div className="absolute bottom-0 p-6 w-full">
      <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-md">About</h2>
      <p className="text-sm text-gray-200 line-clamp-3 mb-4 font-medium drop-shadow-md">
        {artistDetail.desc || `Listen to ${artistDetail.name} on Bluvera. Bio, tour dates, and more.`}
      </p>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:underline">
        Read more <ArrowRight size={14} />
      </div>
    </div>
  </div>
);

// --- Sub: On Tour ---
const OnTour = () => (
  <div className="bg-[#181818] p-5 rounded-xl h-full">
    <h2 className="text-xl font-bold mb-4">On Tour</h2>
    <div className="flex flex-col gap-1">
      {MOCK_EXTRAS.tourDates.map((date) => (
        <div key={date.id} className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-2 rounded-md transition duration-200">
          <div className="bg-[#242424] min-w-[3.5rem] h-14 rounded flex flex-col items-center justify-center border border-white/5 group-hover:border-white/20 transition-colors">
            <span className="text-[10px] font-bold uppercase text-white">{date.month}</span>
            <span className="text-lg font-black text-white leading-none">{date.day}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-white truncate">{date.city}</p>
            <p className="text-xs text-gray-400 truncate">{date.venue}</p>
          </div>
          {date.status === "Sold Out" ? (
             <span className="text-[10px] font-bold text-gray-500 uppercase whitespace-nowrap">Sold Out</span>
          ) : (
             <button className="text-xs font-bold border border-gray-500 px-3 py-1 rounded-full hover:border-white hover:bg-white hover:text-black transition whitespace-nowrap">Tickets</button>
          )}
        </div>
      ))}
    </div>
  </div>
);

// --- Sub: Merch & More ---
const MerchAndMore = () => (
  <div className="flex flex-col gap-6 h-full">
    {/* Merch */}
    <div className="bg-[#181818] p-5 rounded-xl flex-1">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <ShoppingBag size={20}/> Merch
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {MOCK_EXTRAS.merch.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-md mb-2 bg-[#282828] aspect-square">
              <img src={item.image} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-300" alt={item.name} />
            </div>
            <p className="text-sm font-bold truncate text-white group-hover:underline">{item.name}</p>
            <p className="text-xs text-gray-400">{item.price}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Appears On */}
    <div className="bg-[#181818] p-5 rounded-xl">
       <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 hover:text-white cursor-pointer transition-colors">Appears On</h2>
       <div className="flex gap-3 overflow-hidden">
        {MOCK_EXTRAS.appearsOn.map((item, idx) => (
          <div key={idx} className="w-14 h-14 rounded bg-gray-800 flex-shrink-0 cursor-pointer hover:opacity-80 transition relative group" title={item.name}>
             <img src={item.image} className="w-full h-full rounded object-cover shadow-md" alt={item.name}/>
          </div>
        ))}
       </div>
    </div>
  </div>
);

// ==================== 4. MAIN PAGE ====================

const DisplayArtist = () => {
  // TypeScript: useParams có thể undefined, nên cần handle
  const { id } = useParams<{ id: string }>(); 
  
  // Custom hook fetching
  const { data: artistDetail, isLoading, isError } = useHandleGetArtistDetail(id);
  
  // Context
  const { playWithId, currentSong, playStatus, pause } = useContext(PlayerContext);
  
  // Formatter
  const monthlyListeners = new Intl.NumberFormat('en-US').format(85493210);

  if (isLoading) return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="w-10 h-10 border-t-2 border-green-500 rounded-full animate-spin"></div>
    </div>
  );
  
  if (isError || !artistDetail) return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Artist not found</h2>
        <p className="text-gray-400">Please try again later.</p>
    </div>
  );

  return (
    <motion.div 
      className="bg-[#121212] min-h-screen text-white pb-20 font-sans"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* --- HEADER --- */}
      <div className="relative h-[40vh] min-h-[340px] flex items-end">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${artistDetail.image_detail_url})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent" />
        </div>
        <div className="relative z-10 px-6 md:px-8 pb-8 w-full">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={20} fill="#3b82f6" className="text-white"/> 
            <span className="text-sm font-medium">Verified Artist</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 drop-shadow-2xl tracking-tight">{artistDetail.name}</h1>
          <p className="text-base text-gray-200 font-medium drop-shadow-md">{monthlyListeners} monthly listeners</p>
        </div>
      </div>

      {/* --- ACTION BAR --- */}
      <div className="px-6 md:px-8 py-4 flex items-center gap-6 sticky top-[64px] z-30 bg-[#121212]/95 backdrop-blur-md md:bg-transparent md:relative md:top-0">
        <button 
          onClick={playStatus ? pause : () => playWithId(artistDetail.songs[0]?.id)} 
          className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 hover:bg-green-400 transition-all shadow-lg text-black"
        >
          {playStatus ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1"/>}
        </button>
        <button className="px-6 py-1.5 border border-gray-500 rounded-full text-sm font-bold uppercase hover:border-white hover:scale-105 transition tracking-widest">
            Follow
        </button>
        <MoreHorizontal size={32} className="text-gray-400 hover:text-white cursor-pointer transition"/>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="px-6 md:px-8 mt-4 grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Row 1 Left: Popular Songs (3/5) */}
        <div className="lg:col-span-3 h-full">
          <PopularSongs songs={artistDetail.songs} playWithId={playWithId} currentSong={currentSong} playStatus={playStatus} />
        </div>

        {/* Row 1 Right: Latest Release (2/5) */}
        <div className="lg:col-span-2 h-full">
          <LatestRelease />
        </div>

        {/* Row 2 Left: Discography (3/5) */}
        <div className="lg:col-span-3 h-full">
          <Discography songs={artistDetail.songs} />
        </div>

        {/* Row 2 Right: About (2/5) */}
        <div className="lg:col-span-2 h-full min-h-[250px]">
          <About artistDetail={artistDetail} />
        </div>

        {/* Row 3 Left: On Tour (3/5) */}
        <div className="lg:col-span-3 h-full">
          <OnTour />
        </div>

        {/* Row 3 Right: Merch (2/5) */}
        <div className="lg:col-span-2 h-full">
          <MerchAndMore />
        </div>

      </div>
    </motion.div>
  );
};

export default DisplayArtist;