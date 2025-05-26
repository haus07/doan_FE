import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { motion } from "framer-motion";
import { podcasts } from "../components/PodcastList";

const PodcastDetail = () => {
  const { id } = useParams();
  const { setTrack, audioRef } = useContext(PlayerContext);

  // Lấy podcast theo id từ param
  const podcast = podcasts.find((p) => p.id === Number(id));

  const [comments, setComments] = useState([
    { id: 1, user: "Alice", text: "Podcast rất hay, cảm ơn bạn!" },
    { id: 2, user: "Bob", text: "Mình thích phần giải thích kỹ thuật." },
  ]);
  const [newComment, setNewComment] = useState("");

  if (!podcast) {
    return <div className="text-white p-6">Podcast không tồn tại!</div>;
  }

  const handlePlay = () => {
    // Giả sử mỗi podcast có trường audio - bạn cần bổ sung audio URL vào mảng podcasts nếu chưa có
    setTrack({ file: podcast.audio || "", title: podcast.title });
    audioRef.current.play();
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    setComments([
      ...comments,
      { id: comments.length + 1, user: "Bạn", text: newComment.trim() },
    ]);
    setNewComment("");
  };

  return (
    <div className="p-6 text-white max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Ảnh bìa lớn */}
        <motion.img
          src={podcast.image}
          alt={podcast.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Thông tin chi tiết */}
        <div className="flex flex-col flex-1">
          <h1 className="text-4xl font-bold mb-2">{podcast.title}</h1>
          <h2 className="text-green-400 text-xl mb-4">
            Tác giả: {podcast.author}
          </h2>
          <p className="mb-6 text-gray-300">{podcast.description}</p>

          <button
            onClick={handlePlay}
            className="bg-green-500 hover:bg-green-600 transition rounded px-6 py-3 text-lg font-semibold w-40"
          >
            ▶️ Nghe Podcast
          </button>
        </div>
      </div>

      {/* Phần comment */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">Bình luận</h3>

        <div className="space-y-4 max-h-64 overflow-y-auto p-4 bg-[#222222] rounded">
          {comments.length === 0 && (
            <p className="text-gray-400">Chưa có bình luận nào.</p>
          )}

          {comments.map((c) => (
            <div key={c.id} className="border-b border-gray-600 pb-2">
              <p className="font-semibold text-green-400">{c.user}:</p>
              <p className="text-gray-300">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="flex mt-4 gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Viết bình luận..."
            className="flex-1 rounded px-3 py-2 bg-[#111] text-white focus:outline-none"
          />
          <button
            onClick={handleAddComment}
            className="bg-green-500 hover:bg-green-600 px-4 rounded font-semibold"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default PodcastDetail;
