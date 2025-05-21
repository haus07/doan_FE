import { useState } from "react";
import { Input } from "postcss";
import React from "react";
import SearchContent from "./SearchContent";

const SearchInput = () => {
  const [searchQuerry, setSearchQuerry] = useState("")
    
    return (
        <>
            <input
  type="text"
  placeholder="What do you want to listen to..."
  class="bg-black text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  value={searchQuerry}
  onChange={(e)=>setSearchQuerry(e.target.value)}
            />
            <SearchContent searchQuerry={ searchQuerry } />
        </>
    )
}


export default SearchInput
