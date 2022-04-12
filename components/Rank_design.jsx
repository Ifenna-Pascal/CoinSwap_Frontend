import Image from "next/image";
import React from "react";

function Rank_design({image, id, vol, mktcap, short, coinName}) {
  return (
    <div className="flex space-x-3 w-full">
      <span className="text-gray-400 text-base font-semibold mr-5" >{id}</span>
      <div className="flex flex-col items-start">
        <img src={image} width={30} height={30} />
      </div>
      <div className="flex flex-col">
        <div>
          <span className="text-white mr-0 font-semibold font-semi-bold text-base">
            {coinName}
          </span>{" "}
          <span className="text-gray-400 text-sm">[{short}]</span>
        </div>
        <div className="w-full flex">
          <span className="text-left text-sm mr-3 text-gray-400">Mkt Cap</span>
          <span className="text-right text-sm text-gray-400">{mktcap}</span>
        </div>
        <div className="w-full flex">
          <span className="text-left text-sm mr-3 text-gray-400">Volume</span>
          <span className="text-right text-sm text-gray-400">{vol}</span>
        </div>
      </div>
    </div>
  );
}

export default Rank_design;
