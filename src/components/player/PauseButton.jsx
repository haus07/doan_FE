import React from "react";

const PauseButton = ({ onClick, className = "" }) => {
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
        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
      </svg>
    </button>
  );
};

export default PauseButton;
