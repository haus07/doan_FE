import React from "react";

const PlayButton = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M5 3v18l15-9L5 3z" />
      </svg>
    </button>
  );
};

export default PlayButton;
