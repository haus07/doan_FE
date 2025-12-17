import React, { useContext, useState, useMemo, useEffect } from "react";
import { PlayerContext } from '../../context/PlayerContext';
import { useNavigate } from "react-router-dom";
import { 
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, 
  Mic2, ListMusic, MonitorSpeaker, Minimize2,
  Volume2, Volume1, VolumeX 
} from "lucide-react";

// --- IMPORTS ASSETS (Player Run GIFs) ---
import batmanRun from '../../assets/PLayerRun/batman.gif';
import batmanStop from '../../assets/PLayerRun/batmanStop.gif';
import batmanSupermanRun from '../../assets/PLayerRun/batmanAndSupermanRun.gif';
import batmanSupermanStop from '../../assets/PLayerRun/batmanAndSupermanStop.gif';
import jokerBatmanRun from '../../assets/PLayerRun/jokerAndBatmanRun.gif';
import jokerBatmanStop from '../../assets/PLayerRun/jokerAndBatmanStop.gif';
import supermanRun from '../../assets/PLayerRun/supermanRun.gif';
import supermanStop from '../../assets/PLayerRun/supermanStop.gif';
import flashRun from '../../assets/PLayerRun/theFlashRun.gif';
import flashStop from '../../assets/PLayerRun/theFlashStop.gif';

// --- INTERFACES ---
interface TimeState {
    currentTime: { minute: number; second: number };
    totalTime: { minute: number; second: number };
}

interface Track {
    id: string;
    name: string;
    desc: string;
    image: string;
    file: string;
    duration: string;
}

// Định nghĩa kiểu dữ liệu cho Context (Bro check lại file Context gốc để khớp nhé)
interface PlayerContextType {
    track: Track;
    seekBar: React.RefObject<HTMLDivElement>;
    seekBg: React.RefObject<HTMLDivElement>;
    playStatus: boolean;
    play: () => void;
    pause: () => void;
    time: TimeState;
    previous: () => void;
    next: () => void;
    seekSong: (e: React.MouseEvent<HTMLDivElement>) => void;
    volume: number;
    handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Định nghĩa cấu trúc Character
interface CharacterSet {
    id: string;
    run: string;
    stop: string;
    width: string; // Tùy chỉnh size vì mỗi gif to nhỏ khác nhau
    offsetY: string; // Căn chỉnh lề dưới để chân chạm vạch
}

const Player: React.FC = () => {
  // Ép kiểu context
  const { 
    track, seekBar, seekBg, playStatus, play, pause, 
    time, previous, next, seekSong, volume, handleVolumeChange 
  } = useContext(PlayerContext) as PlayerContextType;
  
  const navigate = useNavigate();
  const [isLyricsActive, setIsLyricsActive] = useState<boolean>(false);

  // --- LOGIC PLAYER RUN (NEW) ---
  
  // 1. Định nghĩa danh sách nhân vật
  const characters: CharacterSet[] = useMemo(() => [
    { id: 'flash', run: flashRun, stop: flashStop, width: 'w-16', offsetY: '-bottom-5' },
    { id: 'batman', run: batmanRun, stop: batmanStop, width: 'w-14', offsetY: '-bottom-4' },
    { id: 'superman', run: supermanRun, stop: supermanStop, width: 'w-16', offsetY: '-bottom-6' },
    { id: 'batman_superman', run: batmanSupermanRun, stop: batmanSupermanStop, width: 'w-24', offsetY: '-bottom-5' },
    { id: 'joker_batman', run: jokerBatmanRun, stop: jokerBatmanStop, width: 'w-24', offsetY: '-bottom-5' },
  ], []);

  // 2. Chọn ngẫu nhiên 1 nhân vật khi component mount
  const [selectedChar, setSelectedChar] = useState<CharacterSet>(characters[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    setSelectedChar(characters[randomIndex]);
  }, [characters]);

  // 3. Tính toán phần trăm tiến độ để di chuyển nhân vật
  const progressPercent = useMemo(() => {
     const currentSec = time.currentTime.minute * 60 + time.currentTime.second;
     const totalSec = time.totalTime.minute * 60 + time.totalTime.second;
     if (!totalSec) return 0;
     return (currentSec / totalSec) * 100;
  }, [time]);

  // --- END LOGIC PLAYER RUN ---

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  const toggleLyrics = () => {
    if (isLyricsActive) {
      navigate(-1);
    } else {
      navigate(`/showlyrics/${track.id}`);
    }
    setIsLyricsActive(!isLyricsActive);
    };
    
    if(!track) return null

  return (
    <div className="h-full bg-black flex justify-between items-center text-white px-8 relative z-50">
        
        {/* --- LEFT: TRACK INFO --- */}
        <div className="hidden lg:flex items-center gap-4 w-[30%] min-w-[180px]">
            <img className="w-14 h-14 rounded-md shadow-lg object-cover" src={track.image} alt={track.name} />
            <div className="flex flex-col justify-center overflow-hidden">
                <p className="font-medium text-sm text-white truncate hover:underline cursor-pointer">{track.name}</p>
                <p className="text-xs text-gray-400 truncate hover:text-white hover:underline cursor-pointer">
                    {track.desc || "Artist Name"}
                </p>
            </div>
        </div>
        
        {/* --- CENTER: CONTROLS & SEEK BAR --- */}
        <div className="flex flex-col items-center max-w-[40%] w-full gap-1">
            {/* Control Buttons */}
            <div className="flex items-center gap-4 mb-2">
                <Shuffle size={16} className="text-gray-400 hover:text-white cursor-pointer transition" />
                
                <SkipBack 
                    onClick={previous} 
                    size={20} 
                    className="text-gray-300 hover:text-white cursor-pointer fill-current transition" 
                />
                
                {/* Play/Pause Button */}
                <div 
                    onClick={playStatus ? pause : play}
                    className="bg-white rounded-full p-2 cursor-pointer hover:scale-105 transition-transform active:scale-95"
                >
                    {playStatus ? (
                        <Pause size={20} fill="black" className="text-black ml-[1px]" />
                    ) : (
                        <Play size={20} fill="black" className="text-black ml-[2px]" />
                    )}
                </div>

                <SkipForward 
                    onClick={next} 
                    size={20} 
                    className="text-gray-300 hover:text-white cursor-pointer fill-current transition" 
                />
                
                <Repeat size={16} className="text-gray-400 hover:text-white cursor-pointer transition" />
            </div>

            {/* Seek Bar Row */}
            <div className="flex items-center gap-2 w-full max-w-xl group mb-3  ">
                <span className="text-xs text-gray-400 w-8 text-right font-variant-numeric tabular-nums">
                    {time.currentTime.minute}:{time.currentTime.second < 10 ? `0${time.currentTime.second}` : time.currentTime.second}
                </span>
                
                {/* --- PROGRESS BAR AREA --- */}
                <div 
                    ref={seekBg} 
                    onClick={seekSong} 
                    className="relative flex-1 h-1 bg-gray-600 rounded-full cursor-pointer hover:h-[6px] transition-all"
                >
                    {/* Thanh đã chạy (Green Bar) */}
                    <div 
                        ref={seekBar} 
                        className="h-full bg-white group-hover:bg-green-500 rounded-full relative"
                        style={{ width: `${progressPercent}%` }} // Fallback style nếu ref không cập nhật kịp
                    >
                         {/* Drag Handle (Ẩn đi vì đã có nhân vật thay thế, hoặc để nhỏ) */}
                         {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                    </div>

                    {/* --- PLAYER RUN GIF (CHARACTER) --- */}
                    <div 
                        className={`absolute ${selectedChar.offsetY} transform -translate-x-1/2 z-10 pointer-events-none transition-all duration-75 ease-linear`}
                        style={{ left: `${progressPercent}%` }}
                    >
                        <img 
                            src={playStatus ? selectedChar.run : selectedChar.stop} 
                            alt="Character"
                            className={`${selectedChar.width} h-auto object-contain filter drop-shadow-lg`}
                            // Nếu chạy sang trái thì thêm class: scale-x-[-1]
                        />
                    </div>
                </div>

                <span className="text-xs text-gray-400 w-8 font-variant-numeric tabular-nums">
                    {time.totalTime.minute}:{time.totalTime.second < 10 ? `0${time.totalTime.second}` : time.totalTime.second}
                </span>
            </div>
        </div>
        
        {/* --- RIGHT: EXTRA CONTROLS --- */}
        <div className="hidden lg:flex items-center justify-end w-[30%] gap-3">
            <Mic2 
                onClick={toggleLyrics}
                size={18} 
                className={`cursor-pointer transition hover:text-white ${isLyricsActive ? 'text-green-500' : 'text-gray-400'}`} 
            />
            
            <ListMusic size={18} className="text-gray-400 hover:text-white cursor-pointer transition" />
            <MonitorSpeaker size={18} className="text-gray-400 hover:text-white cursor-pointer transition" />
            
            <div className="flex items-center gap-2 w-32 group">
                <div className="text-gray-400 group-hover:text-white transition">
                    <VolumeIcon />
                </div>
                
                <div className="h-1 flex-1 bg-gray-600 rounded-full relative cursor-pointer overflow-hidden">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div 
                        className="h-full bg-gray-400 group-hover:bg-green-500 rounded-full" 
                        style={{ width: `${volume * 100}%` }}
                    />
                </div>
            </div>

            <Minimize2 size={16} className="text-gray-400 hover:text-white cursor-pointer transition ml-2" />
        </div>
    </div>
  );
}

export default Player;