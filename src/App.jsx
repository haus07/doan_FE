// App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Intro from "./components/Intro";
import Podcasts from "./pages/Podcasts";
import PodcastDetail from "./pages/PodcastDetail";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <Intro onFinish={() => setShowIntro(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Podcasts />} />
        <Route path="podcasts" element={<Podcasts />} />
        <Route path="podcasts/:id" element={<PodcastDetail />} />
        {/* các route khác */}
      </Route>
    </Routes>
  );
}

export default App;
