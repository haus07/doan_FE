import React from 'react';
import AlbumItem from '../cards/AlbumItem';
import SongItem from '../cards/SongItem';
import Artist from '../Artist';

const Section = ({ title, data, type }) => {
  // Nếu không có data thì không render gì cả để tránh lỗi
  if (!data || data.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white hover:underline cursor-pointer">
        {title}
      </h2>
      
      {/* Container cuộn ngang & ẩn thanh scrollbar */}
      <div className="flex overflow-x-auto gap-5 pb-4 no-scrollbar scroll-smooth">
        {data.map((item, index) => {
          // Render item tùy theo loại (type)
          if (type === 'artist') {
             return <Artist key={item.id} id={item.id} img={item.image} name={item.name} role="Artist" albumID={item.albumId} />
          }
          if (type === 'album') {
             return <AlbumItem key={index} id={item.id} name={item.name} desc={item.desc} image={item.image} />
          }
          if (type === 'song') {
             return <SongItem key={item.id || index} id={item.id} name={item.name} desc={item.desc} image={item.image} />
          }
          return null;
        })}
      </div>
    </section>
  );
};

export default Section;