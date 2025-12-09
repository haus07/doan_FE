import React, { useState } from "react";
import SearchContent from "./SearchContent";
import { Search, X } from "lucide-react"; // Nhớ cài lucide-react

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full flex flex-col gap-6">
      {/* THANH INPUT */}
      <div className="relative group w-full md:w-[400px]">
        {/* Icon Kính lúp */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-zinc-400 group-focus-within:text-white transition-colors" />
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="What do you want to listen to?"
          className="w-full bg-[#242424] text-white p-3 pl-10 pr-10 rounded-full 
                     focus:outline-none focus:ring-2 focus:ring-white border border-transparent 
                     hover:bg-[#2a2a2a] hover:border-[#333] transition-all duration-200 placeholder-zinc-400 text-sm font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />

        {/* Nút Xóa (chỉ hiện khi có text) */}
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* KẾT QUẢ TÌM KIẾM */}
      <SearchContent searchQuery={searchQuery} />
    </div>
  );
};

export default SearchInput;