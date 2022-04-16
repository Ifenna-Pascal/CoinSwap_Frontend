import React from "react";
import SwapTable from "../components/SwapTable"; 
import Swaps from "../components/Exchange";
import Transaction from "../components/Transaction";
import Nav from '../components/Nav';
import AuthHook from "../hooks/Auth";

function Swap() {
  const { connect, disconnect, isLoggedIn } = AuthHook();
  return (
    <div className="bg-[#16161D] pb-12">
      <Nav button={isLoggedIn ? disconnect : connect} isLoggedIn={isLoggedIn} isLogin={true}/>
      <div className="max-w-[70%] h-[10%]  space-x-8 py-12 grid grid-cols-2  mx-auto">
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
