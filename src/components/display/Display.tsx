import React, { useEffect, useRef } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { albumsData } from "../../assets/assets";
import ScrollToTop from "../ScrollToTop";

const Display = () => {
  // 1. Định nghĩa Type cho Ref là HTMLDivElement
  const displayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  const isAlbum = location.pathname.includes("album");
  
  // 2. Logic lấy ID an toàn hơn (dùng split như bro muốn)
  // pop() lấy phần tử cuối cùng. Dùng || "" để tránh trường hợp undefined
  const albumId = isAlbum ? location.pathname.split("/").pop() || "" : ""; 

  // 3. Logic đổi màu nền (Background Gradient Effect)
  useEffect(() => {
    if (!displayRef.current) return;

    if (isAlbum && albumId) {
      // Tìm album trong data. 
      // Note: Ép kiểu 'any' tạm thời cho item nếu file assets của bro chưa có type.
      // Bro nên check xem id trong data là string hay number để so sánh cho đúng.
      const albumData = albumsData.find((item: any) => (item._id || item.id) == albumId);

      if (albumData) {
        // Màu nền gradient từ màu album xuống đen
        const bgColor = albumData.bgColor || "#262626"; // Fallback color
        displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
      }
    } else {
      // Nếu không phải album (ví dụ trang Home) thì về màu mặc định
      displayRef.current.style.background = "#121212";
    }
  }, [isAlbum, albumId, location.pathname]); // Chạy lại khi đường dẫn đổi

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded-lg bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      {/* ScrollToTop cần nhận đúng RefObject */}
      <ScrollToTop containerRef={displayRef} />
      
      <Outlet /> 
    </div>
  );
};

export default Display;