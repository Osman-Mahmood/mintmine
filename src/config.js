
import { Contract, ethers } from "ethers";
import factoryAbi from "./abis/factoryAbi.json"
import swapFactoryAbi from "./abis/swapFactory.json";
import pairAbi from "./abis/pairAbi.json"
import { erc20ABI } from "wagmi";
// const ethers = require("ethers")

export const defaultrId = 5;


const chains = [
    {
        id: 1,
        name: 'Ethereum',
        rpc_url: "https://rpc.ankr.com/eth_goerli",
        contractAddress: '0xda071279D98cd69e4E715121DC0A5491Bf5cdff1',
        networkId: 5, // This is mainnet for Ethereum
        explorer: "https://goerli.etherscan.io/",
        wEthAddress: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        factoryAddress: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
    },
    {
        id: 3,
        name: 'Polygon',
        rpc_url: "https://rpc-mumbai.maticvigil.com/",
        contractAddress: '0x647Cba558E9EB6BB30BCA948C9A9c2641584d051',
        networkId: 80001, // Polygon's mainnet ID
        explorer: "https://mumbai.polygonscan.com/"
    },
    // Add more chains as needed...
];

// Example function to fetch details by chain name:
export const getChainDetails = (chainId) => {
    const chain = chains.find(c => c.networkId === chainId);
    return chain ? chain : null;
}

export const getChainExplorer = (chainId) => {
    try {
        let chain = chains.find(c => c.networkId === chainId);
        if (chain) {
            return chain
        } else {
            return chains.find(c => c.networkId === defaultrId);
        }
    } catch (error) {
        console.error("error while get chain explorer", error);
    }
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
export const pairInstance = async (pairAddress, chainId) => {
    try {
        let chain = chains.find(c => c.networkId === chainId);
        if (chain) {
            const provider = new ethers.providers.JsonRpcProvider(chain.rpc_url);
            return new Contract(pairAddress, pairAbi, provider);
        } else {
            chain = chains.find(c => c.networkId === defaultrId);
            const provider = new ethers.providers.JsonRpcProvider(chain.rpc_url);
            return new Contract(pairAddress, pairAbi, provider);
        }

    } catch (error) {
        console.error("errro while remote factory instance", error);
    }
}
export const swapFactoryInstance = async (chainId) => {
    try {
        let chain = chains.find(c => c.networkId === chainId);
        if (chain) {
            const provider = new ethers.providers.JsonRpcProvider(chain.rpc_url);
            return new Contract(chain.factoryAddress, swapFactoryAbi, provider);
        } else {
            chain = chains.find(c => c.networkId === defaultrId);
            const provider = new ethers.providers.JsonRpcProvider(chain.rpc_url);
            return new Contract(chain.factoryAddress, swapFactoryAbi, provider);
        }

    } catch (error) {
        console.error("errro while remote factory instance", error);
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