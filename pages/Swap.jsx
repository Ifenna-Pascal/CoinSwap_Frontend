import React from "react";
import SwapTable from "../components/SwapTable"; 
import Swaps from "../components/Exhcnages";

function Swap() {
  return (
    <div className="bg-[#16161D]">
      <div className="max-w-[70%] space-x-8 py-12 grid grid-cols-2  mx-auto">
          <div className="col-span-1"><SwapTable /></div>
          <div className="w-full  xchange_glass">
              <Swaps />
          </div>
      </div>
      <div className="max-w-[70%] mx-auto bg-[#1F1F29] rounded-2xl">
        <h1 className="text-left tex-4xl font-bold text-white">Transactions for BNB - CSS pair</h1>
      </div>
    </div>
  );
}

export default Swap;
