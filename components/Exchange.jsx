import React, { useState, useEffect } from "react";
import Coin from "./Coin";
import axios from "axios";
import { BigNumber, ethers } from "ethers";
import Web3Modal from 'web3modal';

import AuthHook from "../hooks/Auth";
import LoadContracts from "../hooks/LoadContracts";

function Swaps() {
    // React.useState
    const minAmount = 10;
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [selected, setSelected] = useState();
    const [dropDown, setDropDown] = useState();
    const [show, setShow] = useState(false);
    const [FTtoETH, setFTtoETH] = useState(null);
    const [myFT, setMyFT] = useState(0);
    const { connect, isLoggedIn, account, chainId, accountBal } = AuthHook();
    const { 
      contractTRC,
      contractTRCS,
      tokensSold,
      transactionCount,
      transactions,
      ethPrice,
      isContractLoading,
      DecoinABI,
      DecoinICOABI,
      DeCoinICOAddr
    } = LoadContracts();

    const [result, setResult] = useState([]);

    // // Modal
    // const [isOpen, setIsOpen] = useState(false);
    // const onClose = () => setIsOpen(false);
    // const [inputValue, setInputValue] = useState(0);
    // const handleInput = (e) => setInputValue(e.currentTarget.value);

    useEffect(()=>{
      get_currency();
    }, [isContractLoading]);

    useEffect(() => {
      console.log(account);
    }, [isLoggedIn]);


    const get_currency = async () => {
      try {
        const data = await axios.get(
          'https://api.coinstats.app/public/v1/coins??skip=0&limit=100&currency=USD'
        ).then(async(res) => {
          const result = res.data.coins;
          setResult(result);

          const token = result.find((e) => e.symbol === "ETH" || e.name === "Ethereum");
          setSelected(token);

          const coinList = result.filter((e) => e.symbol === "BNB" || e.symbol === "ETH");
          setDropDown(coinList);

          const getExchange = await getPrice(token);
          setFTtoETH(getExchange);

          if(!isContractLoading) {
            const TREMBal = await contractTRC.balanceOf(account);
            setMyFT(TREMBal / ("1e" + 18));
          }

        });
      } catch (e) {
        console.log(e)
      }
    };

    const setFromPrice = (eth) => {
        const amount = eth.target.value;
        const price = amount / FTtoETH;
        setFrom(amount);
        setTo(price);
    }

    const setToPrice = (token) => {
        const amount = token.target.value;
        const price = amount * FTtoETH;
        setFrom(price);
        setTo(amount);
    }

    const setToMinPrice = () => {
        const minAmountUSD = 50;
        const coinValue = 5;
        const minAmount = minAmountUSD/coinValue;
        const amount = minAmount;
        const price = amount * FTtoETH;
        setFrom(price);
        setTo(amount);
    }

    const setToMaxPrice = () => {
        if(accountBal) {
            const amount = accountBal / ("1e" + 18);
            const price = amount / FTtoETH;
            setFrom(amount);
            setTo(price);
        }
    }

    const handleClick = (state) => {
      setShow(!state);
    };

    const buyToken = async() => {
      if(to < (50/5)) {
        return;
      }
      if(selected.symbol === "ETH" && chainId === 4) {
        const web3Modal = new Web3Modal();
        const conn = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(conn);
        const signer = provider.getSigner();
        const price = from * 10**18;

        let contract = new ethers.Contract(DeCoinICOAddr, DecoinICOABI.abi, signer);
        const c = await contract.deployed();
        try {
          let transaction = await c.buyToken((to * ("1e" + 18)).toString(), {
            value: String(price),
            gasLimit: 500000
          });
          let tx = await transaction.wait();
          setFrom(null);
          setTo(null);
          console.log(tx);
        } catch (error) {
          console.log(error);
        }
      }
    }

    const getTokenFromAPI = (sym = null, name = null, arr = false) => {
      if(arr) {
        const token = result.filter(
          (e) => 
            e.symbol === "BNB" ||
            e.symbol === "ETH"
        );
        return token;
      }
      const token = result.find(
        (e) => 
          e.symbol === sym &&
          e.name === name
      );
      return token;
    }

    const getPrice = (token) => {
      const pricePT = 5/token.price;
      const trcToken = pricePT.toFixed(10);
      return trcToken;
    }

    const ToInput = ({ text }) => {
        return (
          <div>
            <div className="px-4 py-3 flex flex-col bg-[#1F1F29] rounded-2xl border-[0.2px] border-gray-400 space-y-3">
              <span className="text-gray-500  text-base font-semibold mb-0">
                {text}
              </span>
              <div className="grid w-full grid-cols-3 items-center">
                <input
                  onChange={(e) => setToPrice(e)}
                  placeholder="0.0"
                  className="placeholder-white border-none text-white mr-6 col-span-2 bg-transparent focus:outline-none text-3xl font-bold"
                  value={to && to % 1 != 0 ? Number(to).toFixed(4) : to}
                  type="Number"
                />
                <Coin name="TRC" img="/img/logo.png" />
              </div>
            </div>
            <div className="mt-2 mb-5 flex justify-between">
              <div className="flex space-x-4">
                <button onClick={() => setToMinPrice()} className="border px-2 rounded-lg bg-gray-800 text-white">min</button>
                <button onClick={() => setToMaxPrice()} className="border px-2 rounded-lg bg-gray-800 text-white">max</button>
              </div>
              {!isContractLoading && account && (
                <p className="text-gray-100"><span className="font-bold text-gray-400">Bal:</span> {myFT} TREM</p>
              )}
            </div>
          </div>
        );
    };


    const FromInput = ({ text }) => {
        const drop_down = [
          {
            name: "BNB",
            symbol: "BNB",
            img: "https://static.coinstats.app/coins/binancecoinOxw.png",
          },
          {
            name: "Ethereum",
            symbol: "ETH",
            img: "https://static.coinstats.app/coins/1648041569987.png",
          },
        ];
      
        return (
          <div className="flex flex-col relative">
            <div className="px-4 py-3 flex flex-col bg-[#1F1F29] rounded-2xl border-[0.2px] border-gray-400 space-y-3">
              <span className="text-gray-500  text-base font-semibold mb-0">
                {text}
              </span>
              <div className="grid w-full grid-cols-3 items-center">
                <input
                  onChange={(e) => setFromPrice(e)}
                  placeholder="0.0"
                  className="placeholder-white border-none text-white mr-6 col-span-2 bg-transparent focus:outline-none text-3xl font-bold"
                  value={from && from % 1 != 0 ? Number(from).toFixed(4) : from}
                  type="Number"
                />
                <div onClick={() => handleClick(show)} className="flex justify-end items-center">
                  {selected && (
                    <Coin
                      name={selected.symbol}
                      img={selected.icon}
                      hover
                    />
                  )}
                  <svg
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
              <div className="bg-gray-700 absolute right-[1rem] top-[4.5rem] mt-3 space-y-5 self-end flex w-36 flex-col rounded-xl py-3 px-4">
                {dropDown.map((token, i) => (
                  <Coin
                    key={i}
                    option={token}
                    name={token.symbol}
                    img={token.icon}
                    select={setSelected}
                    click = {handleClick}
                    tokenPrice={getPrice(token)}
                    TRCtoToken={setFTtoETH}
                    from={setFrom}
                    to={setTo}
                  />
                ))}
              </div>
            )}
          </div>
        );
    };


    return (
        <div className="">
            <div className="xchabge_glass px-8 pt-8 pb-2 flex flex-col space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex flex-start space-x-4">
                    <h1 className="text-3xl text-white font-bold"> Buy</h1>
                    <span className="text-gray-500 text-2xl ">Info</span>
                  </div>
                  <div>
                    <p><span className="text-gray-400 font-bold mr-2">{Number(FTtoETH).toFixed(4)}</span><span className="font-bold text-gray-100">{selected?.symbol}</span></p>
                    <p className="text-gray-500 text-right">per TRC</p>
                  </div>
                </div>
                <FromInput text="From" />
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
                <ToInput text="To" />
            </div>
            <div className="flex px-8 flex-col items-center mx-auto">
                {account ? (
                    <button onClick={() => buyToken()} className="py-4 mt-2 text-lg font-semibold text-gray-900 bg-[#12FFB8] w-full rounded-xl">
                        Buy Now
                    </button>
                ):(
                    <button onClick={() => connect()} className="py-4 mt-2 text-lg font-semibold text-gray-900 bg-[#12FFB8] w-full rounded-xl">
                        Connect Wallet
                    </button>
                )}
            </div>
        </div>
    );
}

export default Swaps;
