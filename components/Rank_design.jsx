import Image from "next/image";
import React from "react";

function Rank_design({image, id, vol, mktcap, short, coinName}) {
  return (
    <div className="flex space-x-3 w-full">
      <span className="text-gray-400 text-base font-semibold md:mr-5 mr-2 " >{id}</span>
      <div className="flex flex-col items-start">
        <img src={image} width={30} height={30} className='bg-cover' />
      </div>
      <div className="flex flex-col">
        <div>
          <span className="text-white mr-0 font-semibold font-semi-bold text-base">
            {coinName}
          </span>{" "}
          <span className="text-gray-400 text-sm">[{short}]</span>
        </div>
      </div>
    </div>
  );
}

export default Rank_design;
