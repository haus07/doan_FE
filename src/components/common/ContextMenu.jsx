// components/common/ContextMenu.jsx
import React, { useEffect, useState, useRef } from 'react';

const ContextMenu = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault(); // Chặn menu mặc định
      setVisible(true);
      setPosition({ x: e.pageX, y: e.pageY });
    };

    const handleClick = () => setVisible(false);

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (!visible) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute bg-[#282828] border border-[#3e3e3e] rounded shadow-xl p-1 w-48 z-50 text-sm text-white"
      style={{ top: position.y, left: position.x }}
    >
      <ul className="flex flex-col">
        <li className="hover:bg-[#3e3e3e] px-3 py-2 cursor-pointer rounded-sm">Add to Queue</li>
        <li className="hover:bg-[#3e3e3e] px-3 py-2 cursor-pointer rounded-sm">Save to Liked Songs</li>
        <hr className="border-[#3e3e3e] my-1"/>
        <li className="hover:bg-[#3e3e3e] px-3 py-2 cursor-pointer rounded-sm">Go to Artist</li>
        <li className="hover:bg-[#3e3e3e] px-3 py-2 cursor-pointer rounded-sm">Share</li>
      </ul>
    </div>
  );
};

export default ContextMenu;