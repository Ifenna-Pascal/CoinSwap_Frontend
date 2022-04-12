import React, { useState } from "react";
import Coin from "./Coin";

const Exchange = ({ text }) => {
  const handleClick = (state) => {
    setShow(!state);
  };
  const [selected, setSelected] = useState(0);
  const drop_down = [
    {
      name: "BTC",
      img: "https://static.coinstats.app/coins/Bitcoin6l39t.png",
    },
    {
      name: "ETH",
      img: "https://static.coinstats.app/coins/1648041569987.png",
    },
  ];
  const [input, setInput] = useState(null);
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col relative">
      <div className="p-4 flex flex-col bg-[#1F1F29] rounded-2xl border-[0.2px] border-gray-400 space-y-3">
        <span className="text-gray-500  text-base font-semibold mb-2">
          {text}
        </span>
        <div className="grid w-full grid-cols-3 items-center">
          <input
            onChange={(e) => setInput(e.target.value)}
            placeholder="0.0"
            className="placeholder-white border-none text-white mr-6 col-span-2 bg-transparent focus:outline-none text-3xl font-bold"
            value={input}
            type="Number"
          />
          <div className="flex justify-end items-center">
            <Coin
              name={drop_down[selected].name}
              img={drop_down[selected].img}
              hover
            />
            <svg
              onClick={() => handleClick(show)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 hover:cursor-pointer text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      {show && (
        <div className="bg-gray-700 absolute right-[1rem] top-[6rem] mt-3 space-y-5 self-end flex w-36 flex-col rounded-xl py-3 px-4">
          {drop_down.map((x, i) => (
            <Coin
              key={i}
              index={i}
              name={x.name}
              img={x.img}
              select={setSelected}
              click = {handleClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Exchanges = ({ text }) => {
  const [input, setInput] = useState(null);
  return (
    <div className="p-4 flex flex-col bg-[#1F1F29] rounded-2xl border-[0.2px] border-gray-400 space-y-3">
      <span className="text-gray-500  text-base font-semibold mb-2">
        {text}
      </span>
      <div className="grid w-full grid-cols-3 items-center">
        <input
          onChange={(e) => setInput(e.target.value)}
          placeholder="0.0"
          className="placeholder-white border-none text-white mr-6 col-span-2 bg-transparent focus:outline-none text-3xl font-bold"
          value={input}
          type="Number"
        />
        <Coin name="CSS" img="/img/coin_logo.png" />
      </div>
    </div>
  );
};

function Swaps() {
  return (
    <div>
      <div className="xchabge_glass p-8 flex flex-col space-y-8">
        <div className="flex items-center flex-start space-x-6">
          <h1 className="text-3xl text-white font-bold"> Swap </h1>
          <span className="text-gray-500 text-2xl ">Info</span>
        </div>
        <Exchange text="From" />
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 text-gray-600 w-full "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
        <Exchanges text="To" />
      </div>
      <div className="flex flex-col items-center max-w-[90%] mx-auto">
        <button className="py-4 mt-2 text-lg font-semibold text-gray-900 bg-[#12FFB8] w-full rounded-xl">
          Connect Wallet
        </button>
      </div>
    </div>
  );
}

export default Swaps;
