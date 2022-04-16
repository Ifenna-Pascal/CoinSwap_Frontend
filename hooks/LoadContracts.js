import { useEffect, useState } from "react";
import { ethers } from "ethers";
import DeCoin from '../contracts/DeCoin.sol/DeCoin.json';
import DeCoinICO from '../contracts/DeCoinSale.sol/DeCoinSale.json';

const DeCoinAddr = process.env.DECOIN;
const DeCoinICOAddr = process.env.DECOINICO;

function LoadContracts() {
    const [contractTRC, setContractTRC] = useState();
    const [contractTRCS, setContractTRCS] = useState();
    const [isContractLoading, setIsContractLoading] = useState(true);
    const [transactionCount, setTCount] = useState();
    const [tokensSold, setTokenSold] = useState();
    const [transactions, setTransactions] = useState();
    const [ethPrice, setEthPrice] = useState();
    const [DecoinABI, setDecoinABI] = useState(DeCoin);
    const [DecoinICOABI, setDecoinICOABI] = useState(DeCoinICO);

    useEffect(() => {
        async function load() {
            await loadContracts();
            if(!isContractLoading) { await loadVariables(contractTRCS);}
        }
        load();
    }, [isContractLoading]);
    
    const loadVariables = async (contractFTS) => {   
        try {
            const tCount = await contractFTS.transactionCount();
            setTCount(tCount.toNumber());
        
            const tSold = await contractFTS.tokensSold();
            const tokensSold = ethers.BigNumber.from(tSold);
            setTokenSold(tokensSold);
        
            const ethPrice = await contractFTS.getETHPrice();
            const ethPriceN = ethPrice.toNumber();
            setEthPrice(ethPriceN);
        
            // Make this strange for loop to get the last 10 transactions.
            const transactions = [];
            var j = 0;
            for (var i = transactionCount - 1; i >= 0 && j < 10; i--) {
                const t = await contractFTS.transaction(i);
                j++;
                transactions.push(t);
            }
            setTransactions(transactions);
        } catch (error) {
            console.log(error);
        }
    };
    
    const loadContracts = async () => {
        const provider = new ethers.providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/3424ded5b8b4d8aedba869de/eth/rinkeby');
        const FTContract = new ethers.Contract(DeCoinAddr, DeCoin.abi, provider);
        const FTSContract = new ethers.Contract(DeCoinICOAddr, DeCoinICO.abi, provider);

        const FTC = await FTContract.deployed();
        const FTS = await FTSContract.deployed();
    
        setContractTRC(FTC);
        setContractTRCS(FTS);
        setIsContractLoading(false);
        setDecoinABI(DeCoin);
        setDecoinICOABI(DeCoinICO);
    };

    return { contractTRC, contractTRCS, transactionCount, tokensSold, transactions, ethPrice, isContractLoading, DecoinABI, DecoinICOABI, DeCoinAddr, DeCoinICOAddr }
}

export default LoadContracts