import React, { useEffect, useRef } from "react";
import { useLocation, Outlet } from "react-router-dom"; // Thay Routes bằng Outlet
import { albumsData } from "../../assets/assets";
import ScrollToTop from "../ScrollToTop";

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  
  // Logic check Album để đổi màu nền (Giữ nguyên của bro)
  const isAlbum = location.pathname.includes("album");
  // Lưu ý: slice(-1) chỉ lấy đc số có 1 chữ số, nếu id > 9 sẽ lỗi. 
  // Nên dùng split để an toàn hơn:
  const albumId = isAlbum ? location.pathname.split("/").pop() : ""; 
  const bgColor = isAlbum && albumsData[Number(albumId)] ? albumsData[Number(albumId)].bgColor : "#121212";

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    } else {
      displayRef.current.style.background = "#121212";
    }
  }, [isAlbum, bgColor]);

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <ScrollToTop containerRef={displayRef} />
      
      {/* Outlet: Cái lỗ để App nhét nội dung (Home, Album...) vào đây */}
      <Outlet /> 
      
    </div>
  );
};

export default Display;