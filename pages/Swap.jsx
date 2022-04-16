import React from "react";
import SwapTable from "../components/SwapTable";
import Swaps from "../components/Exchange";
import Transaction from "../components/Transaction";
import Nav from "../components/Nav";
import AuthHook from "../hooks/Auth";
import Footer from "../components/Footer";

function Swap() {
  const { connect, disconnect, isLoggedIn } = AuthHook();
  return (
    <div className="bg-[#16161D] pb-12">
      <Nav
        button={isLoggedIn ? disconnect : connect}
        isLoggedIn={isLoggedIn}
        isLogin={true}
      />
      <div className="max-w-[95%] lg:max-w-[70%] h-[10%]  lg:space-x-8 md:py-8 py-6 grid grid-cols-1 lg:grid-cols-2  mx-auto">
        <span className="md:hidden flex items-start font-bold px-3 mb-3 text-white font-Catamaran text-2xl">
          Swap for Tremorcoin
        </span>
        <div className="col-span-1 lg:mb-0 mb-8">
          <SwapTable />
        </div>
        <div className="w-full h-fit pb-12 xchange_glass">
          <Swaps />
        </div>
      </div>
      <Transaction />
      <Footer />
    </div>
  );
}

export default Swap;
