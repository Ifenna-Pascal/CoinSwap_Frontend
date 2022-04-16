import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="w-full">
      <div className="lg:py-24 py-16 items-center justify-center flex flex-col space-y-8 lg:space-y-10">
        <h1 className="font-bold text-3xl text-center lg:text-5xl text-white  leading-10 tracking-wide font-Catamaran">
          Incentivized DeFi protocol
        </h1>
        <span className="text-[#939197] px-4 lg:px-20 text-center text-base lg:text-xl font-semibold leading-8 tracking-wide">
          Tremorcoin is a DEX with a suite of products available in
          Decentralized Finance Environment. It is the perfect ecosystem for
          automated liquidity that is provisioned in the Binance chain icon in
          rounded square Binance Smart Chain, incentivizing community for their
          efforts to the AMM model.
        </span>
        <div className="flex lg:flex-row  flex-col space-y-6 lg:space-y-0  lg:space-x-8 lg:max-w-[60%] max-w-[90%] mx-auto">
        <Link href="/Swap" className="">
            <a className="py-3 bg-[#12FEB7] flex flex-col items-center hover:opacity-100 hover:bg-blend-overlay px-8 rounded-lg text-lg lg:text-xl font-semibold font-Catamaran">
              Buy TRC
            </a>
          </Link>
          <button className="py-3 bg-[#353547] rounded-lg px-8 ronded-lg text-white font-semibold font-Catamaran w-full text-lg lg:text-xl ">
            {" "}
            What is Tremorcoin
          </button>
        </div>
        <span className="text-[#256AC8] font-bold text-xl">What is DeFi</span>
      </div>
    </div>
  );
}

export default Hero;
