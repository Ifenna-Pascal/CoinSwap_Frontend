import DeCoin from '../contracts/DeCoin.sol/DeCoin.json';
import DeCoinICO from '../contracts/DeCoinSale.sol/DeCoinSale.json';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import axios from "axios";

const DeCoinAddr = process.env.DECOIN;
const DeCoinICOAddr = process.env.DECOINICO;

export const load = async() => {
    try {
        await loadWeb3();
        const account = await loadAccount();
        const { contractFT, contractFTS } = await loadContracts();
        const { ethFunds, transactionCount, tokensSold, ethPriceN, transactions } = await loadVariables(contractFTS);
        const bal = await contractFT.balanceOf(account);
        const myFT = bal / 10**18;
        return { account, contractFTS, contractFT, ethFunds, transactionCount, tokensSold, ethPriceN, transactions, myFT };
    } catch (err) {
        console.log(err);
    }
};


const loadVariables = async (contractFTS) => {
    // const web3Modal = new Web3Modal();
    // const conn = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(conn);
    // const signer = provider.getSigner();

    // const admin = "0xf361eC759e85107Eca4C743e59E624cC4382745d";
    // const ethFunds = await signer.getBalance();
    const ethFunds = 0;

    const tCount = await contractFTS.transactionCount();
    const transactionCount = tCount.toNumber();

    const tSold = await contractFTS.tokensSold();
    const tokensSold = ethers.BigNumber.from(tSold);

    const ethPrice = await contractFTS.getETHPrice();
    console.log(ethPrice.toNumber());
    const ethPriceN = ethPrice.toNumber();

    // Make this strange for loop to get the last 10 transactions.
    const transactions = [];
    var j = 0;
    for (var i = transactionCount - 1; i >= 0 && j < 10; i--) {
        const t = await contractFTS.transaction(i);
        j++;
        transactions.push(t);
    }

    return { ethFunds, transactionCount, tokensSold, ethPriceN, transactions };
};

const loadContracts = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/3424ded5b8b4d8aedba869de/eth/rinkeby');
    const FTContract = new ethers.Contract(DeCoinAddr, DeCoin.abi, provider);
    const FTSContract = new ethers.Contract(DeCoinICOAddr, DeCoinICO.abi, provider);

    const contractFT = FTContract;
    const contractFTS = FTSContract;

    return { contractFT, contractFTS };
};

const loadAccount = async () => {
    try {
        const web3Modal = new Web3Modal();
        const conn = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(conn);
        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        return account;
    }catch(err) {
        console.log(err);
    }
};

const loadWeb3 = async() => {
    if (window.ethereum) {
        const web3Modal = new Web3Modal();
        try {
            const conn = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(conn);

            //Sign the Transaction
            const signer = provider.getSigner();
        } catch (error) {
            console.log(error);
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    // else if (window.web3) {
    //     window.web3 = new Web3(web3.currentProvider);
    //     // Acccounts always exposed
    //     web3.eth.sendTransaction({/* ... */});
    // }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};

const loadFeeds = async () => {
    try {
        const data = await axios.get(
          'https://api.coinstats.app/public/v1/coins??skip=0&limit=100&currency=USD'
        );
        const result = data.data.coins;
        const token = await getTokenFromAPI("BNB", "BNB");
        const coinList = await getTokenFromAPI("", "", true);
        if(token) {
          const getExchange = getPrice(token);
          console.log(getExchange);
          setFTtoETH(getExchange);
        }
        setSelected(token);
        setDropDown(coinList);
      } catch (e) {
        console.log(e)
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
    const pricePT = 50/token.price;
    const trcToken = pricePT.toFixed(2);
    return trcToken;
}