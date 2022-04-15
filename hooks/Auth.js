import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from 'web3modal';

function AuthHook() {
    const [account, setAccount] = useState();
    const [connection, setConnection] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [chainId, setChainId] = useState();
    const [accountBal, setAccounBal] = useState();

    useEffect(() => {
        async function checkAuth() {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const addr = await signer.getAddress();
                if(addr) {
                    const chainId = await signer.getChainId();
                    const bal = await signer.getBalance();
                    setConnection(window.ethereum);
                    setAccount(addr);
                    setIsLoggedIn(true);
                    setChainId(chainId);
                    setAccounBal(bal);
                } else {
                    connect();
                }
            } catch (err) {
            }
        }
        checkAuth();
    }, []);

    useEffect(() => {
        setAccount(account);
        setConnection(connection);
        setIsLoggedIn(isLoggedIn);
    }, [isLoggedIn, account, connection])

    const connect = async() => {
        const web3Modal = new Web3Modal();
        try {
            const conn = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(conn);
            const signer = provider.getSigner();
            const account = await signer.getAddress();
            const chainId = await signer.getChainId();
            const bal = await signer.getBalance();
            setChainId(chainId);
            setConnection(conn);
            setAccount(account);
            setIsLoggedIn(true);
            setAccounBal(bal);
        } catch (err) {
            console.log(err);
        }

    }

    const disconnect = async() => {

    }

    return {account, connection, disconnect, connect, isLoggedIn, chainId, accountBal}
}

export default AuthHook;