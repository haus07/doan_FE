import React from "react"
import { useNavigate } from "react-router-dom";


function Artist({ img, name, role ,albumID}) {
      const navigate = useNavigate();
    
    return (
        <div
            onClick={() => navigate(`/album/${albumID}`)}
            className="group relative min-w-[180px] p-2 px-3 rounded hover:bg-[#ffffff26] cursor-pointer"    
        >
            { console.log(albumID)}
            <div>
                <img className="rounded w-full" src={img} alt="" />
            </div>
            <div>
                <p className="font-bold mt-2 mb-1">{name}</p>
                <span className="text-slate-400 text-sm">{ role}</span>
            </div>
        </div>
    )
}

export default Artist