import React from "react";
import SwapTable from "../components/SwapTable"; 
import Swaps from "../components/Exhcnages";
import Transaction from "../components/Transaction";

function Swap() {
  return (
    <div className="bg-[#16161D] py-12">
      <div className="max-w-[70%] h-[10%]  space-x-8 py-12 grid grid-cols-1 lg:grid-cols-2  mx-auto">
          <div className="col-span-1"><SwapTable /></div>
          <div className="w-full h-fit pb-12 xchange_glass">
              <Swaps />
          </div>
      </div>
      <Transaction />
    </div>
  );
}

export default Swap;
