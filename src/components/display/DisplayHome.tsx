import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "../layouts/Navbar";
import { albumsData, songsData } from "../../assets/assets";
import { useHandleGetPopularArtist } from "../../services/artists/artistService";

// Import Components mới tách
import Section from "../common/Section"; 
import HomeSkeleton from "../common/HomeSkeleton"; // Nhớ import skeleton

const DisplayHome = () => {
  // 1. Fetch Data
  const { data: artists, isLoading, isError } = useHandleGetPopularArtist();

  // 2. Logic Random Songs (Dùng useMemo tối ưu hơn useEffect)
  const randomSongs = useMemo(() => {
    return [...songsData].sort(() => Math.random() - 0.5).slice(0, 10);
  }, []); // Chỉ chạy 1 lần khi mount

  // 3. Data cho phần "Made For You"
  const madeForYouItems = [
    { title: "Discover Weekly", desc: "Your weekly mixtape of fresh music", from: "from-purple-600", to: "to-purple-900" },
    { title: "Release Radar", desc: "New releases from your favorite artists", from: "from-green-600", to: "to-green-900" },
    { title: "Daily Mix", desc: "Perfect blend of your favorites", from: "from-blue-600", to: "to-blue-900" },
  ];

  // 4. Xử lý Loading & Error
  if (isLoading) return <HomeSkeleton />;
  if (isError) return <div className="text-center text-red-500 mt-10">Something went wrong!</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 text-white pb-24" // Thêm padding bottom để không bị Player che mất nội dung cuối
    >

      <div className="mt-6 space-y-4">
        
        {/* SECTION 1: ARTISTS (Từ API) */}
        <Section title="Popular Artists" data={artists} type="artist" />

        {/* SECTION 2: CHARTS (Từ Local) */}
        <Section title="Featured Charts" data={albumsData} type="album" />

        {/* SECTION 3: HITS (Random Local) */}
        <Section title="Today's Biggest Hits" data={randomSongs} type="song" />

        {/* SECTION 4: MADE FOR YOU (Custom Cards) */}
        <section>
            <h2 className="text-2xl font-bold mb-4">Made For You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {madeForYouItems.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }} // Chỉ animate khi cuộn tới nơi
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-br ${item.from} ${item.to} p-6 rounded-xl hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-lg group`}
                >
                    <h3 className="text-xl font-bold mb-2 group-hover:underline">{item.title}</h3>
                    <p className="text-sm text-gray-200 opacity-90">{item.desc}</p>
                </motion.div>
                ))}
            </div>
        </section>

      </div>
    </motion.div>
  );
};

export default DisplayHome;