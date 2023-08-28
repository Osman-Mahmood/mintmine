
import { Contract, ethers } from "ethers";
import factoryAbi from "./abis/factoryAbi.json"
import { erc20ABI } from "wagmi";
// const ethers = require("ethers")

export const defaultrId = 5;
const chains = [
    {
        id: 1,
        name: 'Ethereum',
        rpc_url: "https://rpc.ankr.com/eth_goerli",
        contractAddress: '0x141f1986cf226ec06b512b0ee9c7d1068691c4c0',
        networkId: 5, // This is mainnet for Ethereum
        explorer:"https://goerli.etherscan.io/tx"
    },
    // {
    //   id: 2,
    //   name: 'BSC',
    //   details: {
    //     contractAddress: '0xYourBSCContractAddressHere',
    //     networkId: 56 // BSC's mainnet ID
    //   }
    // },
    {
        id: 3,
        name: 'Polygon',
        rpc_url: "https://rpc-mumbai.maticvigil.com/",
        contractAddress: '0xe2578f8a53d3e0b4999d241be4cf647cb4735657',
        networkId: 80001, // Polygon's mainnet ID
        explorer:"https://mumbai.polygonscan.com/tx"
    },
    // Add more chains as needed...
];

// Example function to fetch details by chain name:
export const getChainDetails = (chainId) => {
    const chain = chains.find(c => c.networkId === chainId);
    return chain ? chain : null;
}

export const factoryInstance = async (chainId) => {
    try {
        let chain = chains.find(c => c.networkId === chainId);
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        return new Contract(chain.contractAddress, factoryAbi, signer);
    } catch (error) {
        console.error("errro while factory instance", error);
    }
}

export const remortFactoryInstnce = async (chainId) => {
    try {
        let chain = chains.find(c => c.networkId === chainId);
        if (chain) {
            const provider = new ethers.providers.JsonRpcProvider(chain.rpc_url);
            return new Contract(chain.contractAddress, factoryAbi, provider);
        } else {
            chain = chains.find(c => c.networkId === defaultrId);
            const provider = new ethers.providers.JsonRpcProvider(chain.rpc_url);
            return new Contract(chain.contractAddress, factoryAbi, provider);
        }

    } catch (error) {
        console.error("errro while remote factory instance", error);
    }
}

export const erc20Instance = async (tokenAddress) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        return new Contract(tokenAddress, erc20ABI, signer);
    } catch (error) {
        console.error("error while ecr20 instance", error);
    }
}

export const walletBalance = async (address) => {
    try {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(address);
        return ethers.utils.formatEther(balance)
    } catch (error) {
        console.error("error while wallet balance", error);
    }
}