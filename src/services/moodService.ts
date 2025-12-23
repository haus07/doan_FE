// src/services/moodService.ts

// Giả lập URL backend (đổi lại port nếu ông dùng port khác)
const BACKEND_URL = "http://backend-spotify.test"; 

export const useGetMoods = () => {
  // Mock data khớp 100% với Seeder Laravel (10 items)
  const moods = [
    {
      id: 1,
      title: "Chill / Relax",
      slug: "chill",
      image: `${BACKEND_URL}/storage/images/moods/chill-relax-DC.jpg`,
      color: "from-purple-500 to-indigo-500", 
    },
    {
      id: 2,
      title: "Gym / Workout",
      slug: "workout",
      image: `${BACKEND_URL}/storage/images/moods/gym-workout-DC.jpg`,
      color: "from-red-500 to-orange-500",
    },
    {
      id: 3,
      title: "Focus / Study", // MỚI
      slug: "focus",
      image: `${BACKEND_URL}/storage/images/moods/focus-study-DC.jpg`, // Nhớ sửa tên file trên máy ông thành đúng chính tả này nhé
      color: "from-blue-600 to-slate-700",
    },
    {
      id: 4,
      title: "Party / Energy",
      slug: "party",
      image: `${BACKEND_URL}/storage/images/moods/party-energy-DC.jpg`,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 5,
      title: "Romance / Love",
      slug: "love",
      image: `${BACKEND_URL}/storage/images/moods/romance-love-DC.jpg`,
      color: "from-pink-400 to-red-400",
    },
    {
      id: 6,
      title: "Sad / Heartbreak",
      slug: "sad",
      image: `${BACKEND_URL}/storage/images/moods/sad-heartbreak-DC.jpg`, // Giữ nguyên typo 'hearbreak' để load được ảnh cũ của ông
      color: "from-gray-600 to-slate-800",
    },
    {
      id: 7,
      title: "Sleepy / Dreamy",
      slug: "dreamy",
      image: `${BACKEND_URL}/storage/images/moods/sleepy-dreamy-DC.jpg`,
      color: "from-blue-400 to-cyan-300",
    },
     {
      id: 8,
      title: "Travel / Road Trip",
      slug: "travel",
      image: `${BACKEND_URL}/storage/images/moods/travel-roadtrip.jpg`,
      color: "from-green-400 to-emerald-600",
    },
    {
      id: 9,
      title: "Gaming", // MỚI
      slug: "gaming",
      image: `${BACKEND_URL}/storage/images/moods/gaming-DC.jpg`, // Nhớ tải ảnh này
      color: "from-violet-600 to-purple-800",
    },
    {
      id: 10,
      title: "Hip Hop", // MỚI (Thay thế Late Night)
      slug: "hip-hop",
      image: `${BACKEND_URL}/storage/images/moods/hip-hop-DC.jpg`, // Nhớ tải ảnh này
      color: "from-yellow-500 to-orange-600",
    },
  ];

  return {
    data: moods,
    isLoading: false,
    isError: false
  };
};