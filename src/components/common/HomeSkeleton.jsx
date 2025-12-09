import React from 'react';

const SkeletonItem = () => (
  <div className="min-w-[180px] p-3 rounded-xl bg-[#181818] animate-pulse">
    <div className="w-full h-[160px] bg-zinc-800 rounded-lg mb-4"></div>
    <div className="w-3/4 h-4 bg-zinc-800 rounded mb-2"></div>
    <div className="w-1/2 h-3 bg-zinc-800 rounded"></div>
  </div>
);

const HomeSkeleton = () => {
  return (
    <div className="p-6 space-y-8 overflow-hidden">
      {[1, 2, 3].map((section) => (
        <div key={section}>
          <div className="w-48 h-8 bg-zinc-800 rounded mb-4 animate-pulse"></div>
          <div className="flex gap-5 overflow-hidden">
            {[1, 2, 3, 4, 5].map((item) => <SkeletonItem key={item} />)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeSkeleton;