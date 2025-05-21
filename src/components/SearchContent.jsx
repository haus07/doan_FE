import React from "react";
import { songsData } from "../assets/assets";
import SongItem from "./SongItem";


const SearchContent = ({searchQuerry}) => {
   return (
  <div className="flex flex-col gap-y-2 w-full px-6 py-4 bg-neutral-900">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {songsData.map((item, index) =>item.name.toLowerCase().startsWith(searchQuerry)&& (
        <SongItem
          key={item.id || index}
          name={item.name}
          desc={item.desc}
          id={item.id}
          image={item.image}
        />
      ))}
    </div>
  </div>
);

}

export default SearchContent