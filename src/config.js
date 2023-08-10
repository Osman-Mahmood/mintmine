
import { Contract, ethers } from "ethers";
import factoryAbi from "./abis/factoryAbi.json"
// const ethers = require("ethers")
const chains = [
    {
        id: 1,
        name: 'Ethereum',
        // rpc_url:"https://rpc.ankr.com/eth_goerli",
        contractAddress: '0x61c726dc8d65a4592445d26b0aee04a2f4940533',
        networkId: 5 // This is mainnet for Ethereum

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
        // rpc_url:"https://rpc-mumbai.maticvigil.com/",
        contractAddress: '0xc6afc7a07dd61972b65e04b6f57b2925bf2129bf',
        networkId: 80001 // Polygon's mainnet ID

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
