import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractAdress, contractABI } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAdress, contractABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prev) => ({...prev, [name]: e.target.value}));
    }
    console.log('transactionCount', transactionCount)
    const getAllTransactions = async() => {
        try{
            if(!ethereum) return alert('Please install metamask');

            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
              }));

              setTransactions(structuredTransactions);
        } catch(error){
            throw new Error("No ethereum object.")
        }
    }
    
    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert('Please install metamask');

            const accounts = await ethereum.request({ method: 'eth_accounts' });
    
            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions();
            } else {
                console.log('No account found')
            }
        } catch (error) {
            throw new Error("No ethereum object.")
        }
    }

    const checkIfTransactionsExists = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionsCount();

            window.localStorage.setItem('transactionCount', transactionCount)
        } catch (error) {
            throw new Error("No ethereum object.")
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert('Please install metamask');

            const { addressTo, amount, keyword, message } = formData;

            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({ 
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex,
                }]
            })

            const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            await transactionHash.wait();
            setIsLoading(false);

            const transactionCount = await transactionContract.getTransactionsCount();;
            setTransactionCount(transactionCount.toNumber());
        } catch (error) {
            throw new Error("No ethereum object.")
        }
    }

    const connectWallet = async() => {
        try{
            if(!ethereum) return alert('Please install metamask');

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0])
        } catch(error) {
            throw new Error("No ethereum object.")
        }
    }

    const disConnectWallet = async() => {
        try{
            await window.ethereum.request({
                method: "eth_requestAccounts",
                params: [
                  {
                    eth_accounts: {}
                  }
                ]
              });
            setCurrentAccount('')
            
        } catch(error) {
            throw new Error("No ethereum object.")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExists();
        document.documentElement.classList.add('dark')
    }, [transactionCount])
    useEffect(() => {
        getAllTransactions()
    }, [currentAccount])

    return (<TransactionContext.Provider value={{
        connectWallet,
        currentAccount,
        formData,
        handleChange,
        sendTransaction,
        transactionCount,
        disConnectWallet,
        transactions,
        isLoading
    }}>
        {children}
    </TransactionContext.Provider>)
}