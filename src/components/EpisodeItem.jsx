import { PlayCircle } from "lucide-react";

const EpisodeItem = ({ episode, onPlay }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800 transition">
      <div>
        <h4 className="text-white font-semibold">{episode.title}</h4>
        <p className="text-sm text-gray-400">
          {episode.date} • {episode.duration}
        </p>
      </div>
      <button onClick={() => onPlay(episode.audioUrl)}>
        <PlayCircle className="text-green-400 w-8 h-8 hover:scale-105 transition" />
      </button>
    </div>
  );
};

export default EpisodeItem;
