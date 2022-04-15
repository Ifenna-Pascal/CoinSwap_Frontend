import React, { useEffect, useState } from "react";
import axios from "axios";
import Rank_design from "./Rank_design";
import NumberFormat from 'react-number-format';

function SwapTable() {
  const [result, setResult] = useState([]);
  const get_currency = async () => {
    try {
      const data = await axios.get(
        'https://api.coinstats.app/public/v1/coins??skip=0&limit=100&currency=USD'
      );
      setResult(data.data.coins)
    } catch (e) {
        console.log(e)
    }
  };

  useEffect(()=>{
    get_currency();
  },[])

  return (
    <div className="obj rounded-2xl overflow-hidden">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-400 text-wider uppercase bg-[#262B38] ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Rank Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Last24
            </th>
          </tr>
        </thead>
        <tbody>
          {result &&
            result.slice(0,11).map((x, i) => (
              <tr
                key={i}
                className="bg-white border-b border-gray-600 bg-[#1D2330] hover:cursor-pointer hover:bg-[#262B38] "
              >
                <td
                  scope="row"
                  className="px-6 py-2"
                >
                  <Rank_design vol={x.volume} id={i+1} short={x.symbol} image={x.icon} coinName={x.name} mktcap={x.marketCap}  />
                </td>
                <td className="px-6 py-2 font-semibold text-white text-base">
                  <NumberFormat value={x.price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </td>
                <td className={`px-6 py-2 text-base  ${x.priceChange1h.toString().startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                    {`${x.priceChange1h}%`}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default SwapTable;
